export function userId() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user._id) return user._id;
  return null;
}