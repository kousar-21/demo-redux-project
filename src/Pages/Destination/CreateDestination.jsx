import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ImagePlus } from "lucide-react";
import useImageUpload from "../../Hooks/useImageUpload";

const CreateDestination = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  // ✅ Local state for fake user info (instead of Redux)
  const [userInfo] = useState({
    name: "Demo User",
    email: "demoUser@gmail.com",
  });

  // ✅ Custom image upload hook
  const { picture, handleImageUpload } = useImageUpload();

  // ✅ Mutation for adding destination
  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/destinations`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Destination created successfully!");
      reset();
      setLoading(false);
    },
    onError: () => {
      toast.error("Something went wrong!");
      setLoading(false);
    },
  });

  // ✅ Form Submission
  const onSubmit = async (data) => {
    setLoading(true);

    // Attach image, user info, created date
    const destinationData = {
      ...data,
      image: picture || "",
      userName: userInfo.name,
      userEmail: userInfo.email,
      createdDate: new Date().toISOString(),
    };

    await mutateAsync(destinationData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-8 bg-base-200 rounded-2xl shadow-lg my-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        🏙️ Create New Destination
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 text-gray-800"
      >
        {/* --- Basic Info --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold col-span-full border-b pb-2">
            Basic Information
          </h3>

          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Destination Name (e.g., Bali)"
            className="input input-bordered w-full"
          />

          <input
            {...register("country", { required: true })}
            type="text"
            placeholder="Country"
            className="input input-bordered w-full"
          />

          <select
            {...register("continent", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Continent</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>North America</option>
            <option>South America</option>
            <option>Africa</option>
            <option>Australia</option>
          </select>

          <textarea
            {...register("description", { required: true })}
            placeholder="Short Description"
            className="textarea textarea-bordered col-span-full"
          ></textarea>
        </section>

        {/* --- Cost & Connectivity --- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-base-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold col-span-full border-b pb-2">
            Cost & Connectivity
          </h3>

          <input
            {...register("avgLivingCost", { required: true })}
            type="number"
            placeholder="Avg Living Cost (USD)"
            className="input input-bordered w-full"
          />

          <input
            {...register("currency", { required: true })}
            type="text"
            placeholder="Currency (e.g., USD)"
            className="input input-bordered w-full"
          />

          <input
            {...register("wifiSpeed", { required: true })}
            type="number"
            placeholder="Wi-Fi Speed (Mbps)"
            className="input input-bordered w-full"
          />

          <input
            {...register("coworkingSpaces")}
            type="number"
            placeholder="No. of Coworking Spaces"
            className="input input-bordered w-full"
          />

          <input
            {...register("safetyIndex")}
            type="number"
            placeholder="Safety Index (1–100)"
            className="input input-bordered w-full"
          />
        </section>

        {/* --- Climate & Visa Info --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold col-span-full border-b pb-2">
            Climate & Visa Info
          </h3>

          <input
            {...register("climate.temperature")}
            type="number"
            placeholder="Avg Temperature (°C)"
            className="input input-bordered w-full"
          />

          <input
            {...register("climate.humidity")}
            type="number"
            placeholder="Humidity (%)"
            className="input input-bordered w-full"
          />

          <input
            {...register("climate.seasonBest")}
            type="text"
            placeholder="Best Season (e.g., Nov–Feb)"
            className="input input-bordered w-full"
          />

          <input
            {...register("visaInfo.visaType")}
            type="text"
            placeholder="Visa Type (e.g., Digital Nomad Visa)"
            className="input input-bordered w-full"
          />

          <input
            {...register("visaInfo.visaDuration")}
            type="text"
            placeholder="Visa Duration (e.g., 6 Months)"
            className="input input-bordered w-full"
          />
        </section>

        {/* --- Image Upload --- */}
        <section className="bg-base-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">
            Destination Image
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full">
              <input
                type="file"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
                accept="image/*"
              />
            </div>

            {picture ? (
              <img
                src={picture}
                alt="Preview"
                className="w-48 h-32 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-48 h-32 flex items-center justify-center border rounded-lg text-gray-400">
                <ImagePlus size={32} />
              </div>
            )}
          </div>
        </section>

        {/* --- Submit Button --- */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary px-10"
            disabled={loading}
          >
            {loading ? "Saving..." : "Create Destination"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDestination;
