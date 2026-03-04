import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Trash2, Pencil, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { createRating, getRatings, updateRating, deleteRating } from '../States/Rating/Action';
import { createReview, getReviews, updateReview, deleteReview } from '../States/Review/Action';

// ── Star Selector Component ──
const StarSelector = ({ value, onChange, readonly = false, size = 'md' }) => {
  const [hovered, setHovered] = useState(0);
  const sz = size === 'lg' ? 'w-8 h-8' : 'w-5 h-5';

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sz} cursor-${readonly ? 'default' : 'pointer'} transition-colors ${star <= (hovered || value)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300 fill-gray-300'
            }`}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          onClick={() => !readonly && onChange(star)}
        />
      ))}
    </div>
  );
};

const RatingsReviews = ({ productId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth ?? s.Auth ?? {});
  const { ratings, loading: ratingLoading } = useSelector((s) => s.ratings ?? {});
  const { reviews, loading: reviewLoading } = useSelector((s) => s.reviews ?? {});

  // Rating state
  const [selectedRating, setSelectedRating] = useState(0);
  const [editRatingId, setEditRatingId] = useState(null);
  const [editRatingValue, setEditRatingValue] = useState(0);

  // Review state
  const [reviewText, setReviewText] = useState('');
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState('');

  useEffect(() => {
    if (productId) {
      dispatch(getRatings(productId));
      dispatch(getReviews(productId));
    }
  }, [productId, dispatch]);

  // Check if current user already rated/reviewed
  const myRating = ratings?.find(r => r.user?._id === user?._id || r.user === user?._id);
  const myReview = reviews?.find(r => r.user?._id === user?._id || r.user === user?._id);

  // Average rating
  const avgRating = ratings?.length
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : 0;

  // Rating breakdown
  const breakdown = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: ratings?.filter(r => r.rating === star).length || 0,
  }));

  const handleSubmitRating = async () => {
    if (!user) { toast.error(t('pleaseLoginToRate')); return; }
    if (!selectedRating) { toast.error(t('pleaseSelectRating')); return; }
    try {
      await dispatch(createRating(productId, selectedRating));
      setSelectedRating(0);
      toast.success(t('ratingSubmitted'));
      dispatch(getRatings(productId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateRating = async () => {
    try {
      await dispatch(updateRating(editRatingId, editRatingValue));
      setEditRatingId(null);
      toast.success(t('ratingUpdated'));
      dispatch(getRatings(productId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteRating = async (ratingId) => {
    try {
      await dispatch(deleteRating(ratingId));
      toast.success(t('ratingDeleted'));
      dispatch(getRatings(productId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) { toast.error(t('pleaseLoginToReview')); return; }
    if (!reviewText.trim()) { toast.error(t('pleaseWriteReview')); return; }
    try {
      await dispatch(createReview(productId, reviewText));
      setReviewText('');
      toast.success(t('reviewSubmitted'));
      dispatch(getReviews(productId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateReview = async () => {
    if (!editReviewText.trim()) { toast.error(t('reviewEmptyError')); return; }
    try {
      await dispatch(updateReview(editReviewId, editReviewText));
      setEditReviewId(null);
      toast.success(t('reviewUpdated'));
      dispatch(getReviews(productId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await dispatch(deleteReview(reviewId));
      toast.success(t('reviewDeleted'));
      dispatch(getReviews(productId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">

      {/* ── Rating Summary ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('ratingsReviews')}</h3>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Average */}
          <div className="text-center min-w-[120px]">
            <div className="text-5xl font-bold text-green-600">{avgRating}</div>
            <StarSelector value={Math.round(avgRating)} readonly size="md" onChange={() => { }} />
            <p className="text-sm text-gray-500 mt-1">{ratings?.length || 0} {t('ratings')}</p>
          </div>

          {/* Breakdown */}
          <div className="flex-1">
            {breakdown.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2 mb-1.5">
                <span className="text-sm text-gray-600 w-6">{star}</span>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{ width: ratings?.length ? `${(count / ratings.length) * 100}%` : '0%' }} />
                </div>
                <span className="text-sm text-gray-500 w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Submit Rating ── */}
      {user && !myRating && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-3">{t('rateThisProduct')}</h3>
          <div className="flex items-center gap-4">
            <StarSelector value={selectedRating} onChange={setSelectedRating} size="lg" />
            <button onClick={handleSubmitRating} disabled={!selectedRating || ratingLoading}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm disabled:opacity-50 transition-colors">
              {t('submitRating')}
            </button>
          </div>
        </div>
      )}

      {/* ── My Existing Rating ── */}
      {myRating && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">{t('yourRating')}</p>
              {editRatingId === myRating._id ? (
                <div className="flex items-center gap-3">
                  <StarSelector value={editRatingValue} onChange={setEditRatingValue} size="lg" />
                  <button onClick={handleUpdateRating} className="p-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditRatingId(null)} className="p-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <StarSelector value={myRating.rating} readonly onChange={() => { }} />
              )}
            </div>
            {editRatingId !== myRating._id && (
              <div className="flex gap-2">
                <button onClick={() => { setEditRatingId(myRating._id); setEditRatingValue(myRating.rating); }}
                  className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteRating(myRating._id)}
                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Submit Review ── */}
      {user && !myReview && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-3">{t('writeAReview')}</h3>
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}
            rows={4} placeholder={t('reviewPlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm" />
          <button onClick={handleSubmitReview} disabled={!reviewText.trim() || reviewLoading}
            className="mt-3 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm disabled:opacity-50 transition-colors">
            {t('submitReview')}
          </button>
        </div>
      )}

      {/* ── Reviews List ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          {t('customerReviews', { count: reviews?.length || 0 })}
        </h3>

        {reviews?.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">{t('noReviewsYet')}</p>
        ) : (
          <div className="space-y-4">
            {reviews?.map((review) => {
              const isOwner = review.user?._id === user?._id || review.user === user?._id;
              const userRating = ratings?.find(r => r.user?._id === (review.user?._id || review.user));

              return (
                <div key={review._id} className={`p-4 rounded-xl border ${isOwner ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {/* User info */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
                          {(review.user?.name || review.user?.email || 'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {review.user?.name || review.user?.email || 'User'}
                            {isOwner && <span className="ml-2 text-xs text-green-600 font-normal">(You)</span>}
                          </p>
                          {userRating && <StarSelector value={userRating.rating} readonly size="sm" onChange={() => { }} />}
                        </div>
                      </div>

                      {/* Review text */}
                      {editReviewId === review._id ? (
                        <div>
                          <textarea value={editReviewText} onChange={(e) => setEditReviewText(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
                          <div className="flex gap-2 mt-2">
                            <button onClick={handleUpdateReview}
                              className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 flex items-center gap-1">
                              <Check className="w-3 h-3" /> {t('save')}
                            </button>
                            <button onClick={() => setEditReviewId(null)}
                              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300 flex items-center gap-1">
                              <X className="w-3 h-3" /> {t('cancel')}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700 leading-relaxed">{review.description}</p>
                      )}

                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>

                    {/* Edit/Delete for owner */}
                    {isOwner && editReviewId !== review._id && (
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => { setEditReviewId(review._id); setEditReviewText(review.description); }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteReview(review._id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingsReviews;