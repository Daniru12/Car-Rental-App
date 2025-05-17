import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext'; // adjust path as needed
import { 
  User, 
  Clock, 
  Camera, 
  Edit2, 
  Save, 
  X, 
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  LogOut
} from 'lucide-react';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  // Profile photo handling
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (!userId) return;

    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = () => {
    setLoading(true);
    setError(null);

    // Simulate API call with mock data for preview
    setTimeout(() => {
      const mockData = {
        success: true,
        user: {
          id: userId,
          name: "Alex Morgan",
          email: "alex.morgan@example.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
          role: "Product Designer",
          memberSince: "January 2023",
          bio: "User experience designer with a passion for creating intuitive and accessible interfaces. I love hiking and photography in my free time.",
          avatar: "/api/placeholder/200/200"
        }
      };
      
      setProfile(mockData.user);
      setEditedProfile(mockData.user);
      setLoading(false);
    }, 1000);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({...profile});
    setSaveError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPhotoPreview(null);
    setSaveError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate file upload preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    // Simulate successful update after a delay
    setTimeout(() => {
      setProfile({
        ...editedProfile,
        avatar: photoPreview || profile.avatar,
      });
      setIsEditing(false);
      setIsSaving(false);
      setPhotoPreview(null);
    }, 1000);
  };

  if (!userId) return (
    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-xl">
      <div className="p-4 mb-4 bg-gray-100 rounded-full">
        <User size={32} className="text-gray-500" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-800">Sign In Required</h2>
      <p className="mb-6 text-center text-gray-600">Please log in to view and manage your profile</p>
      <button className="px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Log In
      </button>
    </div>
  );

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white shadow-lg rounded-xl">
        <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700">Loading your profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-white border-l-4 border-red-500 shadow-lg rounded-xl">
        <div className="flex items-center mb-3">
          <div className="p-2 mr-3 text-white bg-red-500 rounded-full">
            <X size={18} />
          </div>
          <h3 className="text-lg font-semibold text-red-600">Unable to Load Profile</h3>
        </div>
        <p className="mb-4 text-gray-700">{error}</p>
        <button 
          onClick={fetchUserProfile}
          className="px-4 py-2 font-medium text-white transition-colors bg-gray-700 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Try Again
        </button>
      </div>
    );

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto overflow-hidden bg-white shadow-xl rounded-xl">
      {/* Top header with background gradient */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="relative -mb-16">
            <div className={`w-32 h-32 mx-auto overflow-hidden border-4 border-white rounded-full shadow-lg ${isEditing ? 'cursor-pointer' : ''}`}>
              <img
                src={photoPreview || profile.avatar || "/api/placeholder/128/128"}
                alt={profile.name}
                className="object-cover w-full h-full"
                onClick={isEditing ? handlePhotoClick : undefined}
              />
            </div>
            
            {isEditing && (
              <div 
                className="absolute inset-0 flex items-center justify-center transition-opacity rounded-full opacity-0 cursor-pointer bg-black/50 hover:opacity-100"
                onClick={handlePhotoClick}
              >
                <Camera size={24} className="text-white" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="pt-20 pb-6">
        {/* Profile header with name and role */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
          <p className="font-medium text-blue-600">{profile.role || 'Member'}</p>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>Member since {profile.memberSince}</span>
          </div>

          {/* Edit/Save buttons */}
          {!isEditing ? (
            <button
              type="button"
              onClick={handleEdit}
              className="flex items-center px-4 py-2 mx-auto mt-4 space-x-2 text-sm font-medium text-blue-700 transition-colors border border-blue-200 rounded-full bg-blue-50 hover:bg-blue-100"
            >
              <Edit2 size={16} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex justify-center mt-4 space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex items-center px-5 py-2 space-x-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-70"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Navigation tabs */}
        <div className="flex justify-center mt-8 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'profile' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`px-4 py-3 ml-8 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'security' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Security
          </button>
        </div>

        {saveError && (
          <div className="p-4 mx-6 mt-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center">
              <X size={16} className="mr-2 text-red-500" />
              <p>{saveError}</p>
            </div>
          </div>
        )}

        {/* Profile content */}
        {activeTab === 'profile' && (
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={isEditing ? editedProfile.name : profile.name}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm border rounded-lg shadow-sm ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={isEditing ? editedProfile.email : profile.email}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm border rounded-lg shadow-sm ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={isEditing ? editedProfile.phone || '' : profile.phone || 'Not provided'}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm border rounded-lg shadow-sm ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={isEditing ? editedProfile.location || '' : profile.location || 'Not provided'}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm border rounded-lg shadow-sm ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={isEditing ? editedProfile.bio || '' : profile.bio || 'No bio provided.'}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`block w-full px-3 py-2 sm:text-sm border rounded-lg shadow-sm ${
                      isEditing 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Security tab content */}
        {activeTab === 'security' && (
          <div className="px-6 py-6">
            <div className="p-5 mb-8 border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Shield size={20} className="text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-blue-800">Account Security</h3>
                  <p className="mt-1 text-sm text-blue-600">
                    Secure your account with regular password updates and monitor your account activity.
                    We recommend enabling two-factor authentication for additional security.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden transition-all duration-200 border border-gray-200 rounded-xl hover:shadow-md group">
                <button className="flex items-center justify-between w-full p-5 text-left">
                  <div className="flex items-center">
                    <div className="p-2 mr-4 bg-indigo-100 rounded-lg">
                      <User size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600">Change Password</h3>
                      <p className="text-sm text-gray-500">Update your password and enhance your account security</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 transition-transform group-hover:text-indigo-500 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="overflow-hidden transition-all duration-200 border border-gray-200 rounded-xl hover:shadow-md group">
                <button className="flex items-center justify-between w-full p-5 text-left">
                  <div className="flex items-center">
                    <div className="p-2 mr-4 bg-indigo-100 rounded-lg">
                      <Calendar size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600">Login Activity</h3>
                      <p className="text-sm text-gray-500">Review your recent login history and active sessions</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 transition-transform group-hover:text-indigo-500 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="overflow-hidden transition-all duration-200 border border-gray-200 rounded-xl hover:shadow-md group">
                <button className="flex items-center justify-between w-full p-5 text-left">
                  <div className="flex items-center">
                    <div className="p-2 mr-4 bg-indigo-100 rounded-lg">
                      <Bell size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Customize what alerts and updates you receive by email</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 transition-transform group-hover:text-indigo-500 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="overflow-hidden transition-all duration-200 border border-gray-200 rounded-xl hover:shadow-md group">
                <button className="flex items-center justify-between w-full p-5 text-left">
                  <div className="flex items-center">
                    <div className="p-2 mr-4 bg-red-100 rounded-lg">
                      <LogOut size={20} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-red-600">Sign Out All Devices</h3>
                      <p className="text-sm text-gray-500">Log out from all devices where your account is active</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 transition-transform group-hover:text-red-500 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;