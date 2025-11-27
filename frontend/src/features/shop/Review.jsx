import { Rating, RoundedStar } from '@smastrom/react-rating'
import React, { useState } from 'react'
import { Textarea } from '../../components/ui/textarea.jsx'
import { Button } from '../../components/ui/button.jsx'
import { Loader2 } from 'lucide-react'
import { useSubmitReviewMutation } from '../product/reviewApi.js'
import toast from 'react-hot-toast'

export default function Review({ id }) {

  const [reviewProduct, { isLoading: isPosting }] = useSubmitReviewMutation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState("");

  const validate = () => {
    if (rating === 0) return "Rating is required";
    if (comment) {
      const len = comment.trim().length;
      if (len < 10) return "Comment too short";
      if (len > 500) return "Comment too long";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setFormError(err);
      return;
    }

    try {
      const result = await reviewProduct({ data: { rating, comment: comment.trim() || null }, id, }).unwrap();
      if (result.error) {
        const message = result.error?.data?.message || result.error?.error || "Something went wrong";
        toast.error(message)
      }

      toast.success("Review added successfully");

      // Reset form
      setRating(0);
      setComment("");
      setFormError("");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className='flex flex-col w-2xs sm:w-md'>

      <div>
        <p>Display comment section</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <h6 className='text-sm'>You can rate our product</h6>
        {/* Rating */}
        <Rating
          style={{ maxWidth: 150 }}
          value={rating}
          onChange={setRating}
          max={5}
          itemStyles={{
            itemShapes: RoundedStar,
            activeFillColor: "#facc15",
            inactiveFillColor: "#e5e7eb",
          }}
          className="cursor-pointer mx-auto"
        />

        {/* Comment */}
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label="Write your review..."
          className=""
        />

        {formError && (
          <p className="text-pink-500 pl-1 text-sm">{formError}</p>
        )}

        {/* Submit */}
        <Button type="submit"
          variant="outline"
          className="border-black text-xs px-8"
          disabled={isPosting}
        >
          {isPosting && <Loader2 className="animate-spin h-4 w-4" />}
          Post</Button>
      </form >

    </div >
  )
}
