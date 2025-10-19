import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useApiClient, userApi } from "../utils/api";

export const useUserSync = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const api = useApiClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.syncUser(api),
    onSuccess: (response: any) => {
      console.log("User synced successfully:", response.data.user);
    },
    onError: (error: any) => {
      console.error("User sync failed:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
    },
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // Wait 1 second between retries
  });

  // Auto-sync user when signed in
  useEffect(() => {
    // Wait for Clerk to finish loading
    if (!isLoaded) {
      return;
    }

    // Only sync if signed in and haven't synced yet and not currently syncing
    if (isSignedIn && !syncUserMutation.data && !syncUserMutation.isPending) {
      // Add a small delay to ensure token is ready
      const timer = setTimeout(() => {
        syncUserMutation.mutate();
      }, 1000); // Increased delay to 1 second

      return () => clearTimeout(timer);
    }
  }, [isSignedIn, isLoaded]);

  return {
    isSyncing: syncUserMutation.isPending,
    isSynced: !!syncUserMutation.data,
    error: syncUserMutation.error,
    refetch: () => syncUserMutation.mutate(), // Add manual refetch
  };
};