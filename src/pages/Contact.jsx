import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/Button';
import { submitContactForm } from '../api/services';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitContactForm(formData);
      setFormData({ name: '', phone: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@dbox.com',
      link: 'mailto:hello@dbox.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Fitness St, New York, NY 10001',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-poppins font-bold text-dark-text mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Send us a message!
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-premium p-8"
          >
            <h2 className="text-2xl font-poppins font-bold text-dark-text mb-6">
              Send us a Message
            </h2>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-primary text-white rounded-lg text-center"
              >
                ✓ Thank you! We'll get back to you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-dark-text mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-dark-text mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-dark-text mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message..."
                  required
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                type="submit"
                disabled={submitting}
              >
                <Send size={20} />
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Info Cards */}
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-premium p-6 hover:shadow-hover transition-all duration-300 block"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-neutral-bg rounded-full">
                    <info.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-dark-text mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-600">{info.value}</p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-premium overflow-hidden h-64"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p className="font-poppins font-semibold">Our Location</p>
                  <p className="text-sm text-gray-100">123 Fitness St, NY 10001</p>
                </div>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-premium p-6"
            >
              <h3 className="font-poppins font-bold text-dark-text mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-poppins font-bold text-dark-text mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'What is your response time?',
                a: 'We typically respond to inquiries within 24 hours during business days.',
              },
              {
                q: 'Do you offer customer support?',
                a: 'Yes! Our support team is available 24/7 via email and phone.',
              },
              {
                q: 'Can I schedule a consultation?',
                a: 'Absolutely! Contact us to book a free consultation with our nutritionists.',
              },
              {
                q: 'How can I provide feedback?',
                a: 'We love hearing from you! Use this form or email us directly.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-premium"
              >
                <h3 className="font-poppins font-bold text-dark-text mb-3">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Contact;
