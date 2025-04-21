import React, { useState } from "react";
import {
  Input,
  Textarea,
  Select,
  Option,
  Button,
  Radio,
} from "@material-tailwind/react";

const CourseForm = () => {
  const [materials, setMaterials] = useState([""]);
  const [resources, setResources] = useState([{ resourceType: "", link: "" }]);
  const [assignments, setAssignments] = useState([{ title: "", detail: "" }]);
  const [certification, setCertification] = useState("false");

  const [formData, setFormData] = useState({
    courseName: "",
    image: "",
    description: "",
    price: "",
    lessons: "",
    duration: "",
    difficultyLevel: "",
    language: "",
    critiqueSessions: "",
    prerequisites: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const course = {
      image: formData.image,
      courseName: formData.courseName,
      description: formData.description,
      price: Number(formData.price),
      lessons: Number(formData.lessons),
      duration: Number(formData.duration),
      diffcultyLevel: formData.difficultyLevel,
      language: formData.language,
      critiqueSessions: formData.critiqueSessions,
      prerequisites: formData.prerequisites,
      materials,
      additionalResource: resources,
      assignment: assignments,
      certification: certification === "true",
    };
    console.log(course);
  };

  const handleAddMaterial = () => setMaterials([...materials, ""]);
  const handleAddResource = () =>
    setResources([...resources, { resourceType: "", link: "" }]);
  const handleAddAssignment = () =>
    setAssignments([...assignments, { title: "", detail: "" }]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold">Course Details</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          variant="static"
          label="Course Name"
          name="courseName"
          onChange={handleChange}
        />
        <Input
          variant="static"
          label="Course Image URL"
          name="image"
          onChange={handleChange}
        />
      </div>

      <Textarea
        variant="static"
        label="Course Description"
        name="description"
        onChange={handleChange}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          variant="static"
          label="Price (INR)"
          type="number"
          name="price"
          onChange={handleChange}
        />
        <Input
          variant="static"
          label="Number of Lessons"
          type="number"
          name="lessons"
          onChange={handleChange}
        />
        <Input
          variant="static"
          label="Course Duration (weeks)"
          type="number"
          name="duration"
          onChange={handleChange}
        />
        <Select
          variant="static"
          label="Difficulty Level"
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, difficultyLevel: val }))
          }
        >
          <Option>Beginer</Option>
          <Option>Moderate</Option>
          <Option>Expert</Option>
        </Select>
        <Select
          variant="static"
          label="Language"
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, language: val }))
          }
        >
          <Option>English</Option>
          <Option>Hindi</Option>
        </Select>
        <Select
          variant="static"
          label="Critique Sessions"
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, critiqueSessions: val }))
          }
        >
          <Option>Daily</Option>
          <Option>Weekly</Option>
          <Option>Monthly</Option>
        </Select>
      </div>

      <Textarea
        variant="static"
        label="Prerequisites"
        name="prerequisites"
        onChange={handleChange}
      />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Materials</h3>
        {materials.map((item, index) => (
          <Input
            key={index}
            variant="static"
            label={`Material ${index + 1}`}
            value={item}
            onChange={(e) => {
              const updated = [...materials];
              updated[index] = e.target.value;
              setMaterials(updated);
            }}
          />
        ))}
        <Button onClick={handleAddMaterial} variant="outlined" size="sm">
          + Add Material
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Additional Resources</h3>
        {resources.map((res, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-4">
            <Input
              variant="static"
              label="Resource Type"
              value={res.resourceType}
              onChange={(e) => {
                const updated = [...resources];
                updated[index].resourceType = e.target.value;
                setResources(updated);
              }}
            />
            <Input
              variant="static"
              label="Resource Link"
              value={res.link}
              onChange={(e) => {
                const updated = [...resources];
                updated[index].link = e.target.value;
                setResources(updated);
              }}
            />
          </div>
        ))}
        <Button onClick={handleAddResource} variant="outlined" size="sm">
          + Add Resource
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Assignments</h3>
        {assignments.map((assign, index) => (
          <div key={index} className="space-y-3">
            <Input
              variant="static"
              label="Assignment Title"
              value={assign.title}
              onChange={(e) => {
                const updated = [...assignments];
                updated[index].title = e.target.value;
                setAssignments(updated);
              }}
            />
            <Textarea
              variant="static"
              label="Assignment Detail"
              value={assign.detail}
              onChange={(e) => {
                const updated = [...assignments];
                updated[index].detail = e.target.value;
                setAssignments(updated);
              }}
            />
          </div>
        ))}
        <Button onClick={handleAddAssignment} variant="outlined" size="sm">
          + Add Assignment
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Certification Provided?</label>
        <div className="flex gap-6">
          <Radio
            name="certification"
            label="Yes"
            value="true"
            checked={certification === "true"}
            onChange={() => setCertification("true")}
            crossOrigin=""
          />
          <Radio
            name="certification"
            label="No"
            value="false"
            checked={certification === "false"}
            onChange={() => setCertification("false")}
            crossOrigin=""
          />
        </div>
      </div>

      <Button color="blue" type="submit" className="mt-6">
        Submit Course
      </Button>
    </form>
  );
};

export default CourseForm;
