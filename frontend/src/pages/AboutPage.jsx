import React from 'react'
import { Users, Target, History, Award } from 'lucide-react'
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image:
      'https://iamages.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    bio: '15+ years in automotive industry',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Operations',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    bio: 'Expert in fleet management',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Customer Experience Director',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
    bio: 'Dedicated to client satisfaction',
  },
  {
    name: 'David Kim',
    role: 'Technical Director',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    bio: 'Innovation and technology expert',
  },
]
const AboutPage = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-24">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="About Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            About DrivEase
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto">
            Revolutionizing the car rental experience with premium service and
            cutting-edge technology
          </p>
        </div>
      </div>
      {/* Mission and Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At DrivEase, we're committed to providing exceptional car rental
                experiences through innovative solutions, transparent practices,
                and unmatched customer service. We believe in making premium
                vehicles accessible to everyone while maintaining the highest
                standards of quality and safety.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where renting a car is as simple as a few
                clicks, where quality meets convenience, and where every journey
                begins with trust and confidence. We're driving towards a more
                connected and efficient way of experiencing mobility.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Customer First
              </h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We strive to
                exceed expectations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We continuously evolve and adapt to provide cutting-edge
                solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <History size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Reliability
              </h3>
              <p className="text-gray-600">
                We deliver on our promises and maintain the highest standards of
                service.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Excellence
              </h3>
              <p className="text-gray-600">
                We pursue excellence in every aspect of our operations.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* History Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="w-0.5 h-full bg-blue-600"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">2023</h3>
                  <p className="text-gray-600">
                    Expanded to 50+ locations nationwide
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="w-0.5 h-full bg-blue-600"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">2020</h3>
                  <p className="text-gray-600">
                    Launched mobile app and digital platform
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="w-0.5 h-full bg-blue-600"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">2018</h3>
                  <p className="text-gray-600">
                    Introduced premium vehicle fleet
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">2015</h3>
                  <p className="text-gray-600">DrivEase was founded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default AboutPage
