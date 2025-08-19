<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 p-2">Contact Us</h1>
        <p class="text-lg text-gray-600 p-2 mx-auto">
          Have questions or need help? We'd love to hear from you. Get in touch with our team.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6 p-3">Get in Touch</h2>

            <div class="space-y-4">

              <div class="flex items-start space-x-3 p-2">
                <MapPinIcon class="w-6 h-6 text-black mt-1" />
                <div class="p-2">
                  <p class="font-medium text-black">Address</p>
                  <p class="text-gray-600">
                    123 Gowlidoddi<br>
                    Financial District<br>
                    Gachibowli City, Hyderabad
                  </p>
                </div>
              </div>


              <div class="flex items-center space-x-3 p-2">
                <PhoneIcon class="w-6 h-6 text-black" />
                <div class="p-2">
                  <p class="font-medium text-black">Phone</p>
                  <p class="text-gray-600">+1234567890</p>
                </div>
              </div>

              <div class="flex items-center space-x-3 p-2">
                <EnvelopeIcon class="w-6 h-6 text-black" />
                <div class="p-2">
                  <p class="font-medium text-black">Email</p>
                  <p class="text-gray-600">snackhub@gmail.com</p>
                </div>
              </div>


              <div class="flex items-start space-x-3 p-2">
                <ClockIcon class="w-6 h-6 text-black mt-1" />
                <div class="p-2">
                  <p class="font-medium text-black">Business Hours</p>
                  <p class="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br>
                    Saturday: 10:00 AM - 4:00 PM<br>
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6 p-2">Send us a Message</h2>

            <form @submit.prevent="submitForm" class="space-y-6 p-2">

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-black mb-2">
                    Full Name *
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    id="name"
                    required
                    class="input-field"
                    placeholder="Enter your full name"
                  >
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    id="email"
                    required
                    class="input-field"
                    placeholder="Enter your email address"
                  >
                </div>
              </div>


              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  v-model="form.subject"
                  id="subject"
                  required
                  class="input-field"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="product">Product Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>


              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  v-model="form.message"
                  id="message"
                  rows="5"
                  required
                  class="input-field"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="submitting"
                  class="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ submitting ? 'Sending...' : 'Send Message' }}
                </button>
              </div>
            </form>

            <div v-if="submitted" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex">
                <CheckCircleIcon class="w-5 h-5 text-green-400" />
                <div class="ml-3">
                  <p class="text-sm font-medium text-green-800">
                    Message sent successfully!
                  </p>
                  <p class="text-sm text-green-700 mt-1">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitting = ref(false)
const submitted = ref(false)

const submitForm = async () => {
  submitting.value = true

  setTimeout(() => {
    submitting.value = false
    submitted.value = true


    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }

    setTimeout(() => {
      submitted.value = false
    }, 5000)
  }, 1000)
}
</script>
<style scoped>
.input-field {
  width: 100%;
  color:black;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  transition: border-color 0.2s ease-in-out;
}
.input-field:focus {
  border-color: #3b82f6;
  outline: none;
}
.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background-color 0.2s ease-in-out;
}
.btn-primary:hover {
  background-color: #2563eb;
}
.btn-primary:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

</style>
