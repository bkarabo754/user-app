import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "@/styles/globals.css";

const UserForm = ({ onSubmit, defaultValues }) => {
  // Initialize the form with default values and validation rules
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const navigate = useNavigate(); // Initialize navigation hook

  // Handle form submission with toast notifications
  const onSubmitWithToast = async (data) => {
    try {
      await onSubmit(data); // Call the onSubmit function passed as a prop
      toast.success("User added successfully!"); // Show success toast
      navigate("/"); // Navigate to the homepage or desired route
    } catch (error) {
      toast.error("Failed to add user."); // Show error toast
    }
  };

  // Define validation rules for each input field
  return (
    <form
      onSubmit={handleSubmit(onSubmitWithToast)} // Use the submission handler
      className='form-container'
    >
      <h2 className='form-title'>Add new user</h2>

      {/* First Name Field */}
      <div className='form-group'>
        <Label className='form-label'>First Name</Label>
        <Input
          {...register("firstName", {
            required: "First name is required", // Required validation
            pattern: {
              value: /^[A-Za-z]+$/, // Regex to allow only alphabetic characters
              message: "First name must contain only alphabetic characters",
            },
          })}
          className='form-input text-black'
          placeholder='Enter your first name'
        />
        {errors.firstName && (
          <p className='error-message'>{errors.firstName.message}</p>
        )}
      </div>

      {/* Last Name Field */}
      <div className='form-group'>
        <Label className='form-label'>Last Name</Label>
        <Input
          {...register("lastName", {
            required: "Last name is required", // Required validation
            pattern: {
              value: /^[A-Za-z]+$/, // Regex to allow only alphabetic characters
              message: "Last name must contain only alphabetic characters",
            },
          })}
          className='form-input text-black'
          placeholder='Enter your last name'
        />
        {errors.lastName && (
          <p className='error-message'>{errors.lastName.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className='form-group'>
        <Label className='form-label'>Email</Label>
        <Input
          {...register("email", {
            required: "Email is required", // Required validation
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Regex for email format
              message: "Enter a valid email address",
            },
          })}
          type='email'
          className='form-input text-black'
          placeholder='Enter your email address'
        />
        {errors.email && (
          <p className='error-message'>{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className='form-group'>
        <Label className='form-label'>Phone</Label>
        <Input
          {...register("phone", {
            required: "Phone number is required", // Required validation
            pattern: {
              value: /^[0-9]+$/, // Regex to allow only numeric characters
              message: "Phone number must be numeric",
            },
          })}
          className='form-input text-black'
          placeholder='Enter your phone number'
        />
        {errors.phone && (
          <p className='error-message'>{errors.phone.message}</p>
        )}
      </div>

      {/* Submit and Cancel Buttons */}
      <div className='flex gap-4'>
        <Button type='submit' className='form-button form-button-primary'>
          Submit
        </Button>
        <Button
          type='button'
          onClick={() => navigate("/")}
          className='form-button form-button-secondary'
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
