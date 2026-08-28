export const normalizeUser = (user) => {
  if (!user) return null;

  const subscription = user.subscription || {};
  const hasValidEndDate = subscription.endDate
    ? new Date(subscription.endDate).getTime() > Date.now()
    : true;
  const subscriptionActive = Boolean(subscription.isActive && hasValidEndDate);

  return {
    ...user,
    subscription: {
      plan: subscription.plan || "free",
      startDate: subscription.startDate || null,
      endDate: subscription.endDate || null,
      isActive: Boolean(subscription.isActive),
      autoRenew: Boolean(subscription.autoRenew),
    },
    subscriptionActive,
  };
};

export const persistAuthState = ({ token, user }) => {
  if (token) {
    localStorage.setItem("token", token);
  }

  const normalizedUser = normalizeUser(user);
  if (normalizedUser) {
    localStorage.setItem("user", JSON.stringify(normalizedUser));
  }

  localStorage.setItem(
    "authState",
    JSON.stringify({
      isAuthenticated: Boolean(token),
      subscriptionActive: Boolean(normalizedUser?.subscriptionActive),
    })
  );

  return normalizedUser;
};

export const getStoredToken = () => localStorage.getItem("token");

export const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? normalizeUser(JSON.parse(storedUser)) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getStoredToken());

export const getUserRole = (user = getStoredUser()) => user?.role || "guest";

export const isAdminUser = (user = getStoredUser()) => ["admin", "moderator"].includes(getUserRole(user));

export const isSubscriptionActive = (user = getStoredUser()) => {
  if (!user) return false;
  return Boolean(user.subscriptionActive || user.subscription?.isActive);
};

export const hasPreviewAccess = (user = getStoredUser()) => {
  return Boolean(isAuthenticated() && user && isSubscriptionActive(user));
};

export const clearAuthState = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("authState");
};

export const updateStoredUser = (updatedUser) => {
  const normalizedUser = normalizeUser(updatedUser);
  if (normalizedUser) {
    localStorage.setItem("user", JSON.stringify(normalizedUser));
  }
  return normalizedUser;
};

export const logoutAPI = (redirectTo = "/login") => {
  clearAuthState();
  if (typeof window !== "undefined") {
    window.location.replace(redirectTo);
  }
};
