import React from 'react'
import { Users, Target, History, Award } from 'lucide-react'
const teamMembers = [
  {
    name: 'Daniru Punsith',
    role: 'CEO & Founder',
    image:
      'https://i.postimg.cc/tJRhXDhF/daniru.jpg',
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
      <div className="relative py-24 text-white bg-blue-600">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="About Hero Background"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container relative z-10 px-4 mx-auto">
          <h1 className="mb-4 text-4xl font-bold text-center md:text-5xl">
            About DrivEase
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-center text-blue-100">
            Revolutionizing the car rental experience with premium service and
            cutting-edge technology
          </p>
        </div>
      </div>
      {/* Mission and Vision */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-800">
                Our Mission
              </h2>
              <p className="leading-relaxed text-gray-600">
                At DrivEase, we're committed to providing exceptional car rental
                experiences through innovative solutions, transparent practices,
                and unmatched customer service. We believe in making premium
                vehicles accessible to everyone while maintaining the highest
                standards of quality and safety.
              </p>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-800">
                Our Vision
              </h2>
              <p className="leading-relaxed text-gray-600">
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
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <Users size={32} className="text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                Customer First
              </h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We strive to
                exceed expectations.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <Target size={32} className="text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                Innovation
              </h3>
              <p className="text-gray-600">
                We continuously evolve and adapt to provide cutting-edge
                solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <History size={32} className="text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                Reliability
              </h3>
              <p className="text-gray-600">
                We deliver on our promises and maintain the highest standards of
                service.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <Award size={32} className="text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
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
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-32 h-32 mx-auto rounded-full"
                  />
                </div>
                <h3 className="mb-1 text-xl font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="mb-2 font-medium text-blue-600">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* History Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
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
                  <h3 className="mb-1 text-xl font-bold text-gray-800">2023</h3>
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
                  <h3 className="mb-1 text-xl font-bold text-gray-800">2020</h3>
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
                  <h3 className="mb-1 text-xl font-bold text-gray-800">2018</h3>
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
                  <h3 className="mb-1 text-xl font-bold text-gray-800">2015</h3>
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
