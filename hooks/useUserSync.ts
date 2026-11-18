import { useUserStore } from "@/app/store/userStore";
import { useSupabase } from "@/hooks/useSupabase";
import { useUser } from "@clerk/expo";
import { useEffect } from "react";

/*
When someone signs up or logs in using Clerk, Clerk knows who they are, but that doesn't automatically mean they have a corresponding record in your Supabase users table.

This hook bridges that gap.

It does four main things:
1. Gets the authenticated user from Clerk.
2. Checks whether that user already exists in Supabase.
3. If they don't exist, creates their database record.
4. Updates Zustand with their currency and onboarding status.*/

export const useUserSync = () => {
  const { user } = useUser();
  const setCurrency = useUserStore((state) => state.setCurrency);
  const setNeedsOnboarding = useUserStore((state) => state.setNeedsOnboarding);
  const authSupabase = useSupabase();

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        const { data: existingUser, error: fetchError } = await authSupabase
          .from("users")
          .select("clerk_id, currency")
          .eq("clerk_id", user.id)
          .maybeSingle();

        if (fetchError) {
          console.error("Error fetching user:", fetchError);
          setNeedsOnboarding(true);
          return;
        }

        if (existingUser) {
          setCurrency(existingUser.currency ?? "INR");
          setNeedsOnboarding(!existingUser.currency);
          return;
        }

        const email = user.emailAddresses[0].emailAddress;

        const { data: newUser, error: insertError } = await authSupabase
          .from("users")
          .upsert(
            {
              clerk_id: user.id,
              email,
              name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
              image_url: user.imageUrl,
            },
            { onConflict: "clerk_id", ignoreDuplicates: false },
          )
          .select("currency")
          .single();

        if (insertError) {
          console.error("Error upserting user:", insertError);
          setNeedsOnboarding(true);
          return;
        }

        setCurrency(newUser?.currency ?? "USD");
        setNeedsOnboarding(!newUser?.currency);

        const { error: accountError } = await authSupabase
          .from("accounts")
          .insert({
            user_id: user.id,
            name: "Cash",
            type: "CASH",
            balance: 0,
            is_default: true,
          });

        if (accountError) {
          console.error("Error creating default account:", accountError);
        }
      } catch (e) {
        console.error("Unexpected sync error:", e);
        setNeedsOnboarding(true);
      }
    };

    syncUser();
  }, [user?.id, authSupabase, setCurrency, setNeedsOnboarding, user]);
};
