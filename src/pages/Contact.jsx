import { motion } from 'framer-motion'
import ContactUs from '../components/ContactUs'

const Contact = () => {
  return (
    <div className="min-h-screen pt-[80px]">
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
          </motion.div>
        </div>
      </section> */}

      <ContactUs />
    </div>
  )
}

export default Contact
