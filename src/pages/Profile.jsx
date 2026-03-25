import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-black via-gray-900 to-black text-white">

      <div className="relative bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl w-[420px]
        shadow-2xl border border-white/10 text-center overflow-hidden">

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 blur-2xl opacity-30"></div>

        {/* Avatar */}
        <div className="relative w-24 h-24 mx-auto rounded-full 
          bg-gradient-to-br from-yellow-400 to-orange-500 
          flex items-center justify-center text-3xl font-bold text-white shadow-xl border border-white/20">
          {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
        </div>

        {/* Name */}
        <h2 className="relative text-2xl font-semibold mt-4 tracking-wide">
          {user?.email?.split("@")[0]}
        </h2>

        {/* Email */}
        <p className="relative text-gray-400 text-sm mt-1">
          {user?.email}
        </p>

        {/* Username */}
        <p className="relative text-gray-500 text-sm mb-6">
          @{user?.email?.split("@")[0]}
        </p>

        {/* Fancy badges (UI only) */}
        <div className="flex justify-center gap-2 mb-6 relative">
          <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
            Active
          </span>
          <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
            Verified
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-6 relative"></div>

        {/* Info cards (fancy UI only) */}
        <div className="space-y-3 relative">

          <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-left">
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-sm">{user?.email}</p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-lg p-3 text-left">
            <p className="text-xs text-gray-400">Username</p>
            <p className="text-sm">@{user?.email?.split("@")[0]}</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;