import React, { useState, useEffect } from "react";
import {
  Input,
  Textarea,
  Button,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import CreatableSelect from "react-select/creatable";
import {
  PencilIcon,
  PlusIcon,
  XMarkIcon,
  InformationCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { db } from "../../firebase";
import {
  addDoc,
  updateDoc,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { fetchDestinationData } from "../../service/destinationService";
import { fetchCountryData } from "../../service/countryService";
import { fetchStateData } from "../../service/stateService";
import { fetchPlaceData } from "../../service/placeService";
import Tooltipx from "../../Components/Tooltip";

const ManageDestination = () => {
  const [tags, setTags] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [activities, setActivities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [images, setImages] = useState([""]);
  const [formData, setFormData] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [editId, setEditId] = useState(null);

  // Keep track of selected *objects* for filtering, but primarily rely on formData for submission
  const [selectedCountryObj, setSelectedCountryObj] = useState(null);
  const [selectedStateObj, setSelectedStateObj] = useState(null);

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [placeList, setPlaceList] = useState([]);

  // --- Data Fetching ---
  const fetchCountry = async () => {
    const res = await fetchCountryData(); // Assume res is [{ id: '1', country: 'India', countryCode: 'IN' }, ...]
    setCountryList(res);
  };

  const fetchState = async () => {
    const res = await fetchStateData(); // Assume res is [{ id: 's1', state: 'Assam', stateCode: 'AS', country: 'India' }, ...]
    setStateList(res);
  };

  const fetchPlace = async () => {
    const res = await fetchPlaceData(); // Assume res is [{ id: 'p1', place: 'Guwahati', placeCode: 'GAU', state: 'Assam', country: 'India' }, ...]
    setPlaceList(res);
  };

  const fetchDestinations = async () => {
    const res = await fetchDestinationData();
    setDestinations(res);
  };

  useEffect(() => {
    fetchCountry();
    fetchState();
    fetchPlace();
    fetchDestinations();
  }, []);

  // --- Drawer Management ---
  const openDrawer = (destination = null) => {
    if (destination) {
      setFormData(destination); // Assuming destination has name and code fields
      setTags(destination.tags || []);
      setHighlights(destination.highlights || []);
      setActivities(destination.recommendedActivities || []);
      setLanguages(destination.languageSpoken || []);
      setImages(destination.images || [""]);
      setEditId(destination.id);

      // Find and set the selected country/state objects for dropdown filtering/initial state
      const country = countryList.find(
        (c) => c.country === destination.country
      );
      setSelectedCountryObj(country || null);
      const state = stateList.find(
        (s) =>
          s.state === destination.state && s.country === destination.country
      );
      setSelectedStateObj(state || null);
    } else {
      // Reset for Add New
      setFormData({});
      setTags([]);
      setHighlights([]);
      setActivities([]);
      setLanguages([]);
      setImages([""]);
      setEditId(null);
      setSelectedCountryObj(null);
      setSelectedStateObj(null);
    }
    setDrawerOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  // --- Form Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (selected) => {
    const values = selected.map((opt) => opt.value);
    setTags(values);
    setFormData((prev) => ({ ...prev, tags: values }));
  };

  const handleHighlightsChange = (selected) => {
    const values = selected.map((opt) => opt.value);
    setHighlights(values);
    setFormData((prev) => ({ ...prev, highlights: values }));
  };

  const handleActivitiesChange = (selected) => {
    const values = selected.map((opt) => opt.value);
    setActivities(values);
    setFormData((prev) => ({ ...prev, recommendedActivities: values }));
  };

  const handleLanguagesChange = (selected) => {
    const values = selected.map((opt) => opt.value);
    setLanguages(values);
    setFormData((prev) => ({ ...prev, languageSpoken: values }));
  };

  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleAddImage = () => setImages((prev) => [...prev, ""]);

  const handleRemoveImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // formData already contains the names and codes
    const dataToSend = {
      ...formData,
      tags,
      highlights,
      recommendedActivities: activities,
      languageSpoken: languages,
      images: images.filter((img) => img.trim() !== ""), // Remove empty image URLs
    };

    // Basic validation example (optional)
    if (
      !dataToSend.destinationName ||
      !dataToSend.country ||
      !dataToSend.state
    ) {
      alert("Please fill in Destination Name, Country, and State.");
      return;
    }

    try {
      if (editId) {
        console.log("Updating destination:", editId, dataToSend); // Debug log
        await updateDoc(doc(db, "destination", editId), dataToSend);
      } else {
        console.log("Adding new destination:", dataToSend); // Debug log
        await addDoc(collection(db, "destination"), dataToSend);
      }
      closeDrawer();
      fetchDestinations(); // Refresh the list
    } catch (error) {
      console.error("Error saving destination: ", error);
      alert(`Failed to save destination: ${error.message}`); // Show error to user
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        await deleteDoc(doc(db, "destination", id));
        fetchDestinations(); // Refresh the list
      } catch (error) {
        console.error("Error deleting destination: ", error);
        alert(`Failed to delete destination: ${error.message}`);
      }
    }
  };

  // --- Render Logic ---
  return (
    <div className="p-6">
      {/* Header and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5">Destination Management</Typography>
        <Button
          onClick={() => openDrawer()}
          //   startIcon={<PlusIcon className="w-5 h-5" />} // Material Tailwind v2 syntax might differ
          className="flex items-center gap-2" // Example for v2+
        >
          <PlusIcon className="w-5 h-5" /> Add Destination
        </Button>
      </div>

      {/* Destination Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border bg-white shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-700">
                Destination
              </th>
              <th className="p-3 text-left font-semibold text-gray-700">
                Place
              </th>
              <th className="p-3 text-left font-semibold text-gray-700">
                State
              </th>
              <th className="p-3 text-left font-semibold text-gray-700">
                Country
              </th>
              <th className="p-3 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((dest) => (
              <tr key={dest.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{dest.destinationName}</td>
                <td className="p-3">{dest.place || "N/A"}</td>{" "}
                {/* Display Place */}
                <td className="p-3">{dest.state}</td>
                <td className="p-3">{dest.country}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Tooltip content="Edit">
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => openDrawer(dest)}
                      >
                        <PencilIcon className="h-4 w-4 text-blue-500" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <IconButton
                        variant="text"
                        size="sm"
                        onClick={() => handleDelete(dest.id)}
                      >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
            {destinations.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No destinations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        placement="right"
        size={600} // Explicit size might be better
        className="p-4 overflow-y-auto !max-w-[600px]" // Use !max-w for override if needed
      >
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b">
          <Typography variant="h6">
            {editId !== null ? "Edit" : "Add"} Destination
          </Typography>
          <IconButton onClick={closeDrawer} variant="text" size="sm">
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pb-10">
          {/* --- Core Info --- */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Input
              variant="static"
              label="Destination Name "
              name="destinationName"
              onChange={handleChange}
              value={formData.destinationName || ""}
              required
            />

            <Select
              variant="static"
              label="Select Country "
              // Use the name from formData for the controlled value
              value={formData.country || ""}
              onChange={(value) => {
                // `value` here is the country NAME string
                const selected = countryList.find((c) => c.country === value);
                setSelectedCountryObj(selected); // Keep track of the object for filtering
                setSelectedStateObj(null); // Reset state object tracker
                setFormData((prev) => ({
                  ...prev,
                  country: selected?.country || "",
                  countryCode: selected?.countryCode || "", // Store code
                  state: "", // Reset state name
                  stateCode: "", // Reset state code
                  place: "", // Reset place name
                  placeCode: "", // Reset place code
                }));
              }}
              required
            >
              {countryList.map((c) => (
                <Option key={c.id || c.countryCode} value={c.country}>
                  {" "}
                  {/* Use unique key */}
                  {c.country}
                </Option>
              ))}
            </Select>

            <Select
              variant="static"
              label="Select State "
              // Use the name from formData for the controlled value
              value={formData.state || ""}
              onChange={(value) => {
                // `value` here is the state NAME string
                const selected = stateList.find(
                  (s) =>
                    s.state === value &&
                    s.country === selectedCountryObj?.country
                );
                setSelectedStateObj(selected); // Keep track of the object for filtering
                setFormData((prev) => ({
                  ...prev,
                  state: selected?.state || "",
                  stateCode: selected?.stateCode || "", // Store code
                  place: "", // Reset place name
                  placeCode: "", // Reset place code
                }));
              }}
              disabled={!selectedCountryObj} // Disable if no country selected
              required
            >
              {stateList
                .filter((s) => s.country === selectedCountryObj?.country)
                .map((s) => (
                  <Option key={s.id || s.stateCode} value={s.state}>
                    {" "}
                    {/* Use unique key */}
                    {s.state}
                  </Option>
                ))}
            </Select>

            <Select
              variant="static"
              label="Select Place"
              // Use the name from formData for the controlled value
              value={formData.place || ""}
              onChange={(value) => {
                // `value` here is the place NAME string
                const selected = placeList.find(
                  (p) =>
                    p.place === value &&
                    p.state === selectedStateObj?.state &&
                    p.country === selectedCountryObj?.country
                );
                setFormData((prev) => ({
                  ...prev,
                  place: selected?.place || "",
                  placeCode: selected?.placeId || "", // Store code
                }));
              }}
              disabled={!selectedStateObj} // Disable if no state selected
              // Not making place required for flexibility
            >
              {placeList
                .filter(
                  (p) =>
                    p.country === selectedCountryObj?.country &&
                    p.state === selectedStateObj?.state
                )
                .map((p) => (
                  <Option key={p.id || p.placeCode} value={p.place}>
                    {" "}
                    {/* Use unique key */}
                    {p.place}
                  </Option>
                ))}
            </Select>
          </div>

          {/* --- Description & Details --- */}
          <Textarea
            variant="static"
            label="Description"
            name="description"
            onChange={handleChange}
            value={formData.description || ""}
          />
          <Input
            variant="static"
            label="Best Time To Visit"
            name="bestTimeToVisit"
            onChange={handleChange}
            value={formData.bestTimeToVisit || ""}
          />

          {/* --- Creatable Selects --- */}
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <Tooltipx content='hello' />
            <CreatableSelect
              isMulti
              onChange={handleTagsChange}
              value={tags.map((val) => ({ label: val, value: val }))}
              placeholder="Type or select tags..."
              styles={{ container: (base) => ({ ...base, zIndex: 10 }) }} // Help with potential overlap
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Highlights
            </label>
            <CreatableSelect
              isMulti
              onChange={handleHighlightsChange}
              value={highlights.map((val) => ({ label: val, value: val }))}
              placeholder="Type or select highlights..."
              styles={{ container: (base) => ({ ...base, zIndex: 9 }) }}
            />
          </div>

          {/* Languages Spoken */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Languages Spoken
              </label>
              <Tooltip content="e.g. English, Hindi, Spanish" placement="right">
                <span className="cursor-pointer">
                  <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                </span>
              </Tooltip>
            </div>
            <CreatableSelect
              isMulti
              onChange={handleLanguagesChange}
              value={languages.map((val) => ({ label: val, value: val }))}
              placeholder="Type or select languages..."
              styles={{ container: (base) => ({ ...base, zIndex: 8 }) }}
            />
          </div>

          {/* Activities */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Activities
              </label>
             
            </div>
            <CreatableSelect
              isMulti
              onChange={handleActivitiesChange}
              value={activities.map((val) => ({ label: val, value: val }))}
              placeholder="Type or select activities..."
              styles={{ container: (base) => ({ ...base, zIndex: 7 }) }}
            />
          </div>

          {/* --- Images --- */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Images (URLs)
            </label>
            {images.map((img, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  variant="static"
                  label={`Image URL ${index + 1}`}
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1"
                  type="url" // Add URL type for basic validation
                />
                {images.length > 1 && ( // Only show remove button if more than one image input exists
                  <IconButton
                    variant="text"
                    size="sm"
                    color="red"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </IconButton>
                )}
              </div>
            ))}
            <Button
              onClick={handleAddImage}
              variant="outlined"
              size="sm"
              className="mt-2"
            >
              + Add Another Image
            </Button>
          </div>

          {/* --- Practical Info --- */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Input
              variant="static"
              label="Recommended Duration (Days)"
              type="number"
              name="recommendedDurationDays"
              onChange={handleChange}
              value={formData.recommendedDurationDays || ""}
              min="1" // Optional: minimum value
            />
            <Input
              variant="static"
              label="Recommended Budget (INR)"
              type="number"
              name="recommendedBudgetINR"
              onChange={handleChange}
              value={formData.recommendedBudgetINR || ""}
              min="0" // Optional: minimum value
            />
          </div>
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
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
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
          </div>
          <Input // Keep hotel separate or add to grid if needed
            variant="static"
            label="Nearest Hotel"
            name="nearestHotel"
            onChange={handleChange}
            value={formData.nearestHotel || ""}
          />

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit">
              {editId ? "Update Destination" : "Add Destination"}
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default ManageDestination;
