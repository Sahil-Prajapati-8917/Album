import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ArrowRight, Phone } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      firstName: '',
      lastName: '',
      message: ''
    });
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-sans">
                Get in — touch with us
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Have questions about our services? Need support, or want to share feedback? We're here to help and would love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium">Phone: +1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
              Live Chat
              <div className="bg-white rounded-full p-1">
                <ArrowRight className="h-4 w-4 text-black" />
              </div>
            </button>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 focus:bg-white"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 focus:bg-white"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  How can we help you?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:bg-white transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
