"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { myFetch } from "utils/myFetch";
import { toast } from "sonner";

export default function FeedbackForm({ trigger, id }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      feedback: "",
      hiringStatus: "",
    },
  });

  const hiringStatus = watch("hiringStatus");

  const onSubmit = async (data) => {
    const payload = {
      feedback: data.feedback,
      hiringStatus: data.hiringStatus,
    };

    console.log("Payload:", payload);

    try {
      const res = await myFetch(`/application/feedback/${id}`, {
        method: "POST",
        data: payload,
      });

      console.log("Response:", res);

      if (res.success) {
        toast.success(res?.message || "Feedback submitted successfully!");
        reset(); // reset form after submit
      } else {
        toast.error("Error: " + (res.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-lg w-full max-w-md px-6 pb-6">
            {/* Feedback */}
            <Textarea
              placeholder="Type your feedback..."
              className="min-h-[140px] mb-4 resize-none"
              {...register("feedback", { required: "Feedback is required" })}
            />
            {errors.feedback && (
              <p className="text-sm text-red-500 mb-4">
                {errors.feedback.message}
              </p>
            )}

            {/* Status */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Status</h3>

              <RadioGroup
                value={hiringStatus}
                onValueChange={(value) =>
                  setValue("hiringStatus", value, { shouldValidate: true })
                }
                className="grid grid-cols-2 gap-3"
              >
                {[
                  { label: "Short Listed", value: "shortlisted" },
                  { label: "On Hold", value: "on hold" },
                  { label: "Hiring", value: "hired" },
                  { label: "Reject", value: "rejected" },
                ].map((item) => (
                  <Label
                    key={item.value}
                    className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                      hiringStatus === item.value
                        ? "border-blue-600 bg-blue-50"
                        : "hover:border-gray-400"
                    }`}
                  >
                    <RadioGroupItem value={item.value} className="sr-only" />
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all ${
                          hiringStatus === item.value
                            ? "border-blue-600 border-[6px]"
                            : "border-gray-300"
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>

              {errors.hiringStatus && (
                <p className="text-sm text-red-500 mt-2">Status is required</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-6 rounded-lg text-lg font-medium"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
