import supabase from "$lib/supabaseClient";
import { writable } from "svelte/store";
import { toast } from "@zerodevx/svelte-toast";

export const user = writable({});

// obtain user info from current session
export async function getSessionUser() {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session && session.user) {
		user.set(session.user);
		return session.user;
	}
	return null;
}

// handle logins
export const login = async (email) => {
	try {
		const { error } = await supabase.auth.signInWithOtp({ email });
		if (error) throw error;
		toast.push("<b>Success</b><br>Check your email for a login link");
	} catch (error) {
		toast.push("<b>Error</b><br>" + error.message);
	}
	return;
};

export const logout = async () => {
	try {
		const { error } = await supabase.auth.signOut();
		location.reload();
		if (error) throw error;
		toast.push("<b>Success</b><br>Successfully signed out");
	} catch (error) {
		toast.push("<b>Error:</b><br>" + error.message);
	}
	return;
};
