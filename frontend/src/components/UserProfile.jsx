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
  Calendar
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

    fetch(`http://localhost:5000/api/profile?user_id=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load profile');
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProfile(data.user);
          // Initialize editedProfile with the fetched data
          setEditedProfile(data.user);
        } else {
          setError('Failed to fetch profile');
        }
      })
      .catch(() => setError('Failed to fetch profile'))
      .finally(() => setLoading(false));
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

    // Prepare form data to handle file upload
    const formData = new FormData();
    Object.entries(editedProfile).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // Add the photo if selected
    if (fileInputRef.current?.files[0]) {
      formData.append('avatar', fileInputRef.current.files[0]);
    }

    // Simulated API call - replace with actual implementation
    setTimeout(() => {
      // Simulate successful update
      setProfile({
        ...editedProfile,
        avatar: photoPreview || profile.avatar,
      });
      setIsEditing(false);
      setIsSaving(false);
      setPhotoPreview(null);
    }, 1000);

    // For actual implementation:
    /*
    fetch(`http://localhost:5000/api/profile/${userId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProfile(data.user);
          setIsEditing(false);
          setPhotoPreview(null);
        } else {
          setSaveError(data.message || 'Failed to update profile');
        }
      })
      .catch((err) => setSaveError(err.message || 'Failed to update profile'))
      .finally(() => setIsSaving(false));
    */
  };

  if (!userId) return (
    <div className="p-6 text-center bg-white rounded-lg shadow-md">
      <User size={48} className="mx-auto mb-4 text-gray-400" />
      <p className="text-lg text-gray-700">Please log in to see your profile.</p>
      <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Log In
      </button>
    </div>
  );

  if (loading)
    return (
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <p className="text-gray-700">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-white border-l-4 border-red-500 rounded-lg shadow-md">
        <div className="flex items-center mb-2 text-red-600">
          <X size={20} className="mr-2" />
          <h3 className="font-semibold">Error</h3>
        </div>
        <p className="text-gray-700">{error}</p>
        <button 
          onClick={fetchUserProfile}
          className="px-4 py-2 mt-4 text-gray-800 transition-colors bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Try Again
        </button>
      </div>
    );

  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
      {/* Header with tabs */}
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 sm:p-6">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <h1 className="mb-4 text-xl font-bold text-white sm:text-2xl sm:mb-0">Account Settings</h1>
          
          <div className="flex p-1 space-x-1 rounded-lg bg-blue-700/30">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'profile' 
                ? 'bg-white text-blue-800' 
                : 'text-white hover:bg-blue-700/50'}`}
            >
              Profile
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'security' 
                ? 'bg-white text-blue-800' 
                : 'text-white hover:bg-blue-700/50'}`}
            >
              Security
            </button>
          </div>
        </div>
      </div>

      {/* Profile content */}
      {activeTab === 'profile' && (
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit}>
            {/* Profile header with photo */}
            <div className="relative flex flex-col items-center mb-6">
              <div className="relative group">
                <div className={`w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md ${isEditing ? 'cursor-pointer' : ''}`}>
                  <img
                    src={photoPreview || profile.avatar || "/api/placeholder/100/100"}
                    alt={profile.name}
                    className="object-cover w-full h-full"
                    onClick={isEditing ? handlePhotoClick : undefined}
                  />
                </div>
                
                {isEditing && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-opacity rounded-full opacity-0 cursor-pointer bg-black/40 group-hover:opacity-100"
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
              
              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
                <p className="text-gray-600">{profile.role || 'Member'}</p>
                <div className="flex items-center justify-center mt-1 text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  Member since {profile.memberSince}
                </div>
              </div>

              {/* Edit/Save buttons */}
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="absolute top-0 right-0 p-2 text-gray-600 hover:text-blue-600"
                >
                  <Edit2 size={20} />
                </button>
              ) : (
                <div className="flex mt-4 space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 space-x-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-70"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : (
                      <>
                        <Save size={16} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {saveError && (
              <div className="p-3 mb-6 text-red-700 border-l-4 border-red-500 bg-red-50">
                {saveError}
              </div>
            )}

            {/* Form fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={isEditing ? editedProfile.name : profile.name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 cursor-default'
                    }`}
                  />
                  <User size={16} className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={isEditing ? editedProfile.email : profile.email}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 cursor-default'
                    }`}
                  />
                  <Mail size={16} className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={isEditing ? editedProfile.phone || '' : profile.phone || 'Not provided'}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 cursor-default'
                    }`}
                  />
                  <Phone size={16} className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block mb-1 text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={isEditing ? editedProfile.location || '' : profile.location || 'Not provided'}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full px-3 py-2 border rounded-md ${
                      isEditing 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-200 cursor-default'
                    }`}
                  />
                  <MapPin size={16} className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="bio" className="block mb-1 text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="3"
                  value={isEditing ? editedProfile.bio || '' : profile.bio || 'No bio provided.'}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-gray-50 border-gray-200 cursor-default'
                  }`}
                />
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Security tab content */}
      {activeTab === 'security' && (
        <div className="p-4 sm:p-6">
          <div className="p-4 mb-6 border border-blue-200 rounded-md bg-blue-50">
            <h3 className="mb-2 font-medium text-blue-800">Account Security</h3>
            <p className="text-sm text-blue-700">
              Manage your password and security settings here. We recommend updating your password regularly.
            </p>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden border border-gray-200 rounded-md">
              <div className="flex items-center justify-between p-4 bg-gray-50">
                <div className="flex items-center">
                  <div className="p-2 mr-3 bg-blue-100 rounded-full">
                    <User size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Password</h3>
                    <p className="text-sm text-gray-500">Change your password</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-md">
              <div className="flex items-center justify-between p-4 bg-gray-50">
                <div className="flex items-center">
                  <div className="p-2 mr-3 bg-blue-100 rounded-full">
                    <Calendar size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Login Activity</h3>
                    <p className="text-sm text-gray-500">View your recent login history</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-md">
              <div className="flex items-center justify-between p-4 bg-gray-50">
                <div className="flex items-center">
                  <div className="p-2 mr-3 bg-blue-100 rounded-full">
                    <Mail size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Manage what emails you receive</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;