import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useCampaigns } from '../../contexts/CampaignContext';
const CampaignForm: React.FC = () => {
  const {
    theme
  } = useTheme();
  const {
    addCampaign
  } = useCampaigns();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'active' as 'active' | 'paused' | 'completed'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Campaign name is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Budget must be a positive number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      addCampaign({
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budget: Number(formData.budget),
        status: formData.status
      });
      navigate('/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to create campaign. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  const inputClasses = `w-full px-4 py-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500`;
  const errorClasses = 'text-red-500 text-sm mt-1';
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Campaign Name
        </label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`} placeholder="Enter campaign name" />
        {errors.name && <p className={errorClasses}>{errors.name}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-1">
            Start Date
          </label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className={`${inputClasses} ${errors.startDate ? 'border-red-500' : ''}`} />
          {errors.startDate && <p className={errorClasses}>{errors.startDate}</p>}
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium mb-1">
            End Date
          </label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className={`${inputClasses} ${errors.endDate ? 'border-red-500' : ''}`} />
          {errors.endDate && <p className={errorClasses}>{errors.endDate}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-1">
            Budget ($)
          </label>
          <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} className={`${inputClasses} ${errors.budget ? 'border-red-500' : ''}`} placeholder="Enter budget amount" min="0" step="100" />
          {errors.budget && <p className={errorClasses}>{errors.budget}</p>}
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} className={inputClasses}>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      {errors.submit && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.submit}
        </div>}
      <div className="flex justify-end space-x-3">
        <button type="button" onClick={() => navigate('/campaigns')} className={`px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Campaign'}
        </button>
      </div>
    </form>;
};
export default CampaignForm;