import React, { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import CreatableSelect from "react-select/creatable";
import {
  PencilIcon,
  PlusIcon,
  XMarkIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const ManageDestination = () => {
  const [tags, setTags] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [activities, setActivities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [images, setImages] = useState([""]);
  const [formData, setFormData] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const openDrawer = (index = null) => {
    if (index !== null) {
      const data = destinations[index];
      setFormData(data);
      setTags(data.tags || []);
      setHighlights(data.highlights || []);
      setActivities(data.recommendedActivities || []);
      setLanguages(data.languageSpoken || []);
      setImages(data.images || [""]);
      setEditIndex(index);
    } else {
      setFormData({});
      setTags([]);
      setHighlights([]);
      setActivities([]);
      setLanguages([]);
      setImages([""]);
      setEditIndex(null);
    }
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setTags(values);
    setFormData((prev) => ({ ...prev, tags: values }));
  };

  const handleHighlightsChange = (options) => {
    const values = options.map((opt) => opt.value);
    setHighlights(values);
    setFormData((prev) => ({ ...prev, highlights: values }));
  };

  const handleActivitiesChange = (options) => {
    const values = options.map((opt) => opt.value);
    setActivities(values);
    setFormData((prev) => ({ ...prev, recommendedActivities: values }));
  };

  const handleLanguagesChange = (options) => {
    const values = options.map((opt) => opt.value);
    setLanguages(values);
    setFormData((prev) => ({ ...prev, languageSpoken: values }));
  };

  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleAddImage = () => {
    setImages((prev) => [...prev, ""]);
  };

  const handleRemoveImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...destinations];
      updated[editIndex] = formData;
      setDestinations(updated);
    } else {
      setDestinations([...destinations, formData]);
    }
    closeDrawer();
  };

  const handleDelete = (index) => {
    const updated = destinations.filter((_, i) => i !== index);
    setDestinations(updated);
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5">Destination Management</Typography>
        <Button
          onClick={() => openDrawer()}
          startIcon={<PlusIcon className="w-5 h-5" />}
        >
          Add Destination
        </Button>
      </div>
      <Tooltip content="Material Tailwind" placement="top">
        <Button>Right</Button>
      </Tooltip>

      <table className="min-w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Destination</th>
            <th className="p-2 text-left">Country</th>
            <th className="p-2 text-left">State</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((dest, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{dest.destinationName}</td>
              <td className="p-2">{dest.country}</td>
              <td className="p-2">{dest.state}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <IconButton variant="text" onClick={() => openDrawer(index)}>
                    <PencilIcon className="h-5 w-5 text-blue-500" />
                  </IconButton>
                  <IconButton
                    variant="text"
                    onClick={() => handleDelete(index)}
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        placement="right"
        // size={"lg"}
        className={`${
          drawerOpen ? " !max-w-[600px]" : null
        } p-4 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6">
            {editIndex !== null ? "Edit" : "Add"} Destination
          </Typography>
          <IconButton onClick={closeDrawer} variant="text">
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            variant="static"
            label="Destination Name"
            name="destinationName"
            onChange={handleChange}
            value={formData.destinationName || ""}
          />
          <Textarea
            variant="static"
            label="Description"
            name="description"
            onChange={handleChange}
            value={formData.description || ""}
          />
          <div className="z-20">

          <Tooltip content="Material Tailwind" placement="top" className='z-20'>
            <Button>Right</Button>
          </Tooltip>
          </div>
          <Input
            variant="static"
            label="Country "
            name="country"
            onChange={handleChange}
            value={formData.country || ""}
          />
          <Input
            variant="static"
            label="State "
            name="state"
            onChange={handleChange}
            value={formData.state || ""}
          />
          <Input
            variant="static"
            label="Place "
            name="place"
            onChange={handleChange}
            value={formData.place || ""}
          />
          <Input
            variant="static"
            label="Best Time To Visit"
            name="bestTimeToVisit"
            onChange={handleChange}
            value={formData.bestTimeToVisit || ""}
          />

          <div>
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium">Tags</label>
              <Tooltip content="Material Tailwind" placement="top" className='z-10'>
                <Button>Right</Button>
              </Tooltip>
            </div>
            <CreatableSelect
              isMulti
              onChange={handleTagsChange}
              value={tags.map((val) => ({ label: val, value: val }))}
              placeholder="Enter tags..."
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium">Highlights</label>
            </div>
            <CreatableSelect
              isMulti
              onChange={handleHighlightsChange}
              value={highlights.map((val) => ({ label: val, value: val }))}
              placeholder="Enter highlights..."
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium">
                Languages Spoken
              </label>
              <Tooltip content="e.g. English, Hindi" placement="right">
                <span className="cursor-pointer">
                  <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                </span>
              </Tooltip>
            </div>
            <CreatableSelect
              isMulti
              onChange={handleLanguagesChange}
              value={languages.map((val) => ({ label: val, value: val }))}
              placeholder="Enter languages..."
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium">Activities</label>
              <Tooltip content="e.g. Trekking, Boating" placement="right">
                <span className="cursor-pointer">
                  <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                </span>
              </Tooltip>
            </div>
            <CreatableSelect
              isMulti
              onChange={handleActivitiesChange}
              value={activities.map((val) => ({ label: val, value: val }))}
              placeholder="Enter activities..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Images</label>
            {images.map((img, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  variant="static"
                  label={`Image URL ${index + 1}`}
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1"
                />
                <IconButton
                  variant="text"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XMarkIcon className="w-5 h-5 text-red-500" />
                </IconButton>
              </div>
            ))}
            <Button onClick={handleAddImage} variant="outlined" size="sm">
              + Add Image
            </Button>
          </div>

          <Input
            variant="static"
            label="Recommended Duration (Days)"
            type="number"
            name="recommendedDurationDays"
            onChange={handleChange}
            value={formData.recommendedDurationDays || ""}
          />
          <Input
            variant="static"
            label="Recommended Budget (INR)"
            type="number"
            name="recommendedBudgetINR"
            onChange={handleChange}
            value={formData.recommendedBudgetINR || ""}
          />
          <Textarea
            variant="static"
            label="Weather Info"
            name="weatherInfo"
            onChange={handleChange}
            value={formData.weatherInfo || ""}
          />
          <Textarea
            variant="static"
            label="Visa Requirements"
            name="visaRequirements"
            onChange={handleChange}
            value={formData.visaRequirements || ""}
          />
          <Input
            variant="static"
            label="Currency Used"
            name="currencyUsed"
            onChange={handleChange}
            value={formData.currencyUsed || ""}
          />
          <Textarea
            variant="static"
            label="Local Customs"
            name="localCustoms"
            onChange={handleChange}
            value={formData.localCustoms || ""}
          />
          <Textarea
            variant="static"
            label="Safety Tips"
            name="safetyTips"
            onChange={handleChange}
            value={formData.safetyTips || ""}
          />
          <Input
            variant="static"
            label="Nearest Airport"
            name="nearestAirport"
            onChange={handleChange}
            value={formData.nearestAirport || ""}
          />
          <Input
            variant="static"
            label="Nearest Hospital"
            name="nearestHospital"
            onChange={handleChange}
            value={formData.nearestHospital || ""}
          />
          <Input
            variant="static"
            label="Nearest Hotel"
            name="nearestHotel"
            onChange={handleChange}
            value={formData.nearestHotel || ""}
          />

          <Button type="submit">Submit Destination</Button>
        </form>
      </Drawer>
    </div>
  );
};

export default ManageDestination;
