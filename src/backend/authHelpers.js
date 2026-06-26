const normalizeIdentifier = (value) => String(value || '').trim().toLowerCase();

export const resolveRegisteredUser = ({ registeredUsersByEmail, registeredUsersByEmployeeId, identifier }) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  if (!normalizedIdentifier) return null;

  const byEmail = registeredUsersByEmail.get(normalizedIdentifier);
  if (byEmail) return byEmail;

  return registeredUsersByEmployeeId.get(normalizedIdentifier) || null;
};

export const authenticateUser = ({ registeredUsersByEmail, registeredUsersByEmployeeId, identifier, password }) => {
  const user = resolveRegisteredUser({ registeredUsersByEmail, registeredUsersByEmployeeId, identifier });

  if (!user) {
    return { success: false, reason: 'account' };
  }

  if (user.password !== password) {
    return { success: false, reason: 'password' };
  }

  return { success: true, user };
};
