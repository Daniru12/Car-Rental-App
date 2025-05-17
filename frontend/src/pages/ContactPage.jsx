import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Check,
  Loader2,
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setIsSubmitting(false);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="relative py-24 text-white bg-blue-600">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80 "
            alt="Contact Hero Background"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container relative z-10 px-4 mx-auto">
          <h1 className="mb-4 text-4xl font-bold text-center md:text-5xl">
            Contact Us
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-center text-blue-100">
            Get in touch with us for any questions or support. We're here to help!
          </p>
        </div>
      </div>

      {/* Floating Contact Card & Form Section */}
      <div className="container relative z-20 px-4 mx-auto mb-16 -mt-16">
        <div className="p-8 bg-white shadow-xl rounded-xl md:p-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="h-full p-6 bg-blue-50 rounded-xl">
                <h2 className="mb-8 text-2xl font-bold text-gray-800">Get in Touch</h2>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="p-3 mr-4 bg-blue-600 rounded-full shadow-md">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-800">Phone</h3>
                      <p className="font-medium text-blue-700">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-600">Mon-Fri 9am-6pm EST</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-3 mr-4 bg-blue-600 rounded-full shadow-md">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-800">Email</h3>
                      <p className="font-medium text-blue-700">info@driveease.com</p>
                      <p className="text-sm text-gray-600">support@driveease.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-3 mr-4 bg-blue-600 rounded-full shadow-md">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-800">Office</h3>
                      <p className="text-gray-600">
                        123 Rental Street,
                        <br />
                        Car City, CC 12345
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-3 mr-4 bg-blue-600 rounded-full shadow-md">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-800">Live Chat</h3>
                      <p className="text-gray-600">
                        Available 24/7
                        <br />
                        <span className="font-medium text-green-600">
                          Average response time: 5 minutes
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-8 mt-12 border-t border-blue-100">
                  <h3 className="mb-4 font-semibold text-gray-800">Connect With Us</h3>
                  <div className="flex space-x-4">
                    {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                      <div
                        key={social}
                        className="flex items-center justify-center w-10 h-10 transition-shadow bg-white rounded-full shadow-sm cursor-pointer hover:shadow-md"
                      >
                        <div className="w-5 h-5 bg-blue-600 rounded-sm"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Send us a Message</h2>
              {isSubmitted ? (
                <div className="p-8 text-center bg-green-50 rounded-xl">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">Thank You!</h3>
                  <p className="text-gray-600">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please provide details about your inquiry..."
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </a>{' '}
                      and consent to being contacted regarding my inquiry.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-all bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Find quick answers to common questions about our services, booking process, and more.
          </p>
        </div>
        <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-2">
          {[
            {
              q: "How do I book a car rental?",
              a: "You can book a car rental through our website, mobile app, or by calling our customer service team at +1 (555) 123-4567.",
            },
            {
              q: "What is your cancellation policy?",
              a: "We offer free cancellation up to 48 hours before your scheduled pickup time. Cancellations within 48 hours may be subject to a fee.",
            },
            {
              q: "Do you offer airport pickup services?",
              a: "Yes, we offer convenient airport pickup services at major airports. You can select this option during the booking process.",
            },
            {
              q: "What documents do I need to rent a car?",
              a: "You'll need a valid driver's license, a credit card in your name, and proof of insurance. International customers may need additional documentation.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-gray-800">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800">
            View all FAQs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Our Location</h2>
            <div className="overflow-hidden shadow-lg rounded-xl">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb= !1m18!1m12!1m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1697436022592!5m2!1sen!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DrivEase Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="py-12 bg-gradient-to-r from-blue-700 to-blue-500">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Ready to hit the road?</h2>
            <p className="mb-8 text-xl text-blue-100">
              Book your next car rental with us and experience hassle-free driving.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="px-8 py-3 font-medium text-blue-600 transition-colors bg-white rounded-lg shadow-md hover:bg-blue-50"
              >
                Browse Vehicles
              </a>
              <a
                href="#"
                className="px-8 py-3 font-medium text-white transition-colors bg-blue-800 rounded-lg shadow-md hover:bg-blue-900"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;