// src/api/emailService.ts

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  country: string;
  message: string;
}

/**
 * Sends contact form data to the backend API
 * @param formData The contact form data to send
 * @returns Promise that resolves when the email is sent
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // In a real implementation, this would be an API call to your backend
    // For example:
    // const response = await fetch('https://api.yourbackend.com/send-email', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    // const data = await response.json();
    // return data;

    // For now, we'll simulate a successful API call
    console.log('Sending email with data:', formData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful response
    return {
      success: true,
      message: 'Your message has been sent successfully!'
    };
    
    // To simulate an error, uncomment this:
    // throw new Error('Network error');
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'There was an error sending your message. Please try again.'
    };
  }
};
