import { Rating, RoundedStar } from '@smastrom/react-rating'
import React, { useState } from 'react'
import { Textarea } from '../../components/ui/textarea.jsx'
import { Button } from '../../components/ui/button.jsx'
import { Loader2 } from 'lucide-react'
import { useGetAllReviewQuery, useSubmitReviewMutation } from '../product/reviewApi.js'
import toast from 'react-hot-toast'
import { Avatar, AvatarFallback } from '../../components/ui/avatar.jsx'
import { useGetDistinctUsersByFurnitureQuery } from '../product/orderApi.js'
import { getAutUser } from '../../lib/auth.js'

export default function Review({ id }) {

  const [reviewProduct, { isLoading: isPosting }] = useSubmitReviewMutation();
  const { data, isError, isLoading, isFetching } = useGetAllReviewQuery({ furniture: id });
  const { data: orderUser, isLoading: isChecking } = useGetDistinctUsersByFurnitureQuery({ furniture: id });
  const auth = getAutUser();
  const userId = auth?.id;

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

  if (isLoading || isChecking) return
  <div className='flex items-center justify-center py-10 text-muted-foreground'>
    <Loader2 className='mr-2 h-5 w-5 animate-spin'>Loading...</Loader2>
  </div>

  const hasPurchased = orderUser?.includes(userId);
  const hasReviewed = data?.some(
    (review) => review.user?._id === userId
  );
  const canReview = hasPurchased && !hasReviewed;
  return (
    <div className='flex flex-col w-2xs sm:w-md space-y-1'>

      <h5 className="font-bold text-gray-800">Customer Reviews</h5>

      {/* Review List */}
      <div className="h-48 overflow-y-auto rounded-md border p-2">
        {isFetching ? (
          <div className='flex items-center justify-center py-10 text-muted-foreground'>
            <Loader2 className='mr-2 h-5 w-5 animate-spin'>Loading...</Loader2>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-10 text-red-500">
            <p>Failed to load.</p>
          </div>
        ) : !data.length ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No reviews yet.
          </p>
        ) : (
          <div className="space-y-2">
            {data && data.map((review) => (
              <div key={review?._id} className="rounded-lg border p-2 py-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>
                      {review?.user?.name ? review?.user?.name[0].toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs text-slate-900 select-none">
                    {review?.user?.name}
                  </p>
                </div>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <Rating style={{ maxWidth: 60 }} readOnly value={review.rating} precision={0.5} transition="zoom"
                      itemStyles={{
                        itemShapes: RoundedStar, // or "thin", "rounded", "star"
                        activeFillColor: "#facc15", // yellow-400
                        inactiveFillColor: "#e5e7eb" // gray-200
                      }} />
                    <p className='text-gray text-[10px]'>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {!auth && (
        <p className="text-xs text-muted-foreground text-center">
          Please log in to leave a review.
        </p>
      )}

      {auth && !hasPurchased && (
        <p className="text-xs text-muted-foreground text-center">
          Only customers who purchased this product can leave a review.
        </p>
      )}

      {auth && hasPurchased && hasReviewed && (
        <p className="text-xs text-muted-foreground text-center">
          You have already reviewed this product.
        </p>
      )}

      {/* Review Form */}
      {canReview && <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <h6 className='text-sm'>Rate this product</h6>
          <p className='text-[0.6rem]'>Tell others what you think</p>
        </div>
        {/* Rating */}
        <Rating
          style={{ maxWidth: 120 }}
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
          placeholder="Write your review... (optional)"
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
      </form >}

    </div >
  )
}
