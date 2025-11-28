"use client";
import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  Plus,
  MapPin,
  Phone,
  Mail,
  Link,
  Briefcase,
  Type,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
} from "lucide-react";

function TextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState("14");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      if (value) {
        editorRef.current.innerHTML = value;
      }
      // setIsInitialized(true);
    }
  }, [isInitialized, value]);

  const executeCommand = (command, commandValue) => {
    document.execCommand(command, false, commandValue);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    executeCommand("fontSize", e.target.value);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 border-b border-gray-300 p-2 sm:p-3 flex flex-wrap gap-1.5 sm:gap-2 items-center text-xs sm:text-sm">
        <select
          value={fontSize}
          onChange={handleFontSizeChange}
          className="px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[10, 12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <div className="w-px h-5 sm:h-6 bg-gray-300" />
        <button
          onClick={() => {
            const color = prompt("Enter color (hex or name):");
            if (color) executeCommand("foreColor", color);
          }}
          className="p-1.5 sm:p-2 hover:bg-gray-200 rounded transition-colors"
          title="Text Color"
        >
          <Type className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="w-px h-5 sm:h-6 bg-gray-300" />
        {[
          { cmd: "bold", Icon: Bold, title: "Bold" },
          { cmd: "italic", Icon: Italic, title: "Italic" },
          { cmd: "underline", Icon: Underline, title: "Underline" },
        ].map(({ cmd, Icon, title }) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="p-1.5 sm:p-2 hover:bg-gray-200 rounded transition-colors"
            title={title}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        ))}
        <div className="w-px h-5 sm:h-6 bg-gray-300" />
        <button
          onClick={() => executeCommand("strikethrough")}
          className="p-1.5 sm:p-2 hover:bg-gray-200 rounded transition-colors"
          title="Strikethrough"
        >
          <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="w-px h-5 sm:h-6 bg-gray-300" />
        {[
          { cmd: "justifyLeft", Icon: AlignLeft, title: "Align Left" },
          { cmd: "justifyCenter", Icon: AlignCenter, title: "Align Center" },
          { cmd: "justifyRight", Icon: AlignRight, title: "Align Right" },
        ].map(({ cmd, Icon, title }) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="p-1.5 sm:p-2 hover:bg-gray-200 rounded transition-colors"
            title={title}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        ))}
        <div className="w-px h-5 sm:h-6 bg-gray-300" />
        {[
          { cmd: "insertUnorderedList", Icon: List, title: "Bullet List" },
          {
            cmd: "insertOrderedList",
            Icon: ListOrdered,
            title: "Numbered List",
          },
        ].map(({ cmd, Icon, title }) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="p-1.5 sm:p-2 hover:bg-gray-200 rounded transition-colors"
            title={title}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        ))}
        <div className="w-px h-5 sm:h-6 bg-gray-300" />
        <button
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) executeCommand("createLink", url);
          }}
          className="p-1.5 sm:p-2 hover:bg-gray-200 rounded transition-colors"
          title="Insert Link"
        >
          <Link2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => executeCommand("formatBlock", "<pre>")}
          className="p-1.5 sm:p-2 hover:bg-gray-200 rounded transition-colors"
          title="Code Block"
        >
          <Code className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-32 p-3 sm:p-4 outline-none text-xs sm:text-sm leading-relaxed bg-white"
        suppressContentEditableWarning
      />
    </div>
  );
}

const AddNewResumeForm = () => {
  const [resumeName, setResumeName] = useState("Resume Of UX Designer");
  const [personalInfo, setPersonalInfo] = useState({
    address: "Seattle, WA",
    contact: "+12345678910",
    email: "User@Gmail.Com",
    socialMedia: "linkedin.Com/Profile",
    portfolio: "Github.Com/Jobname",
  });
  const [summary, setSummary] = useState("");
  const [coreSkills, setCoreSkills] = useState("");
  const [experiences, setExperiences] = useState([
    {
      id: "1",
      title: "Senior Database Administrator",
      company: "Microsoft Corporation, Redmond, WA",
      startDate: "",
      endDate: "SQL Server",
      description: "",
    },
  ]);
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "Senior Database Administrator",
      description:
        "Built 9-42 AD Topology With Lifetime, Read-Only Hosting, And Automatic Page Repair.",
    },
  ]);
  const [education, setEducation] = useState([
    {
      id: "1",
      degree: "Bsc In Computer Science",
      university: "University Of Washington, Seattle, WA",
    },
  ]);
  const [certifications, setCertifications] = useState([
    {
      id: "1",
      name: "Bsc In Computer Science",
      details: "",
    },
  ]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const updateExperience = (id, field, value) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        title: "",
        description: "",
      },
    ]);
  };

  const updateProject = (id, field, value) => {
    setProjects(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now().toString(),
        degree: "",
        university: "",
      },
    ]);
  };

  const updateEducation = (id, field, value) => {
    setEducation(
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        id: Date.now().toString(),
        name: "",
        details: "",
      },
    ]);
  };

  const updateCertification = (id, field, value) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors self-start sm:self-center">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
            Add New Resume
          </h1>
          <input
            type="text"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            className="w-full max-w-xs sm:max-w-md mx-auto sm:mx-0 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-center sm:text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter resume title..."
          />
        </div>
      </div>

      {/* Personal Information */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              label: "Address",
              icon: MapPin,
              key: "address",
              placeholder: "e.g., Dhaka, Bangladesh",
            },
            {
              label: "Contact",
              icon: Phone,
              key: "contact",
              placeholder: "+880...",
            },
            {
              label: "Email",
              icon: Mail,
              key: "email",
              placeholder: "you@example.com",
            },
            {
              label: "Social Media",
              icon: Link,
              key: "socialMedia",
              placeholder: "linkedin.com/in/...",
            },
            {
              label: "Portfolio",
              icon: Briefcase,
              key: "portfolio",
              placeholder: "github.com/...",
            },
          ].map(({ label, icon: Icon, key, placeholder }) => (
            <div key={key} className="min-w-0">
              <label className="block text-xs sm:text-sm font-medium mb-1.5">
                {label}
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={personalInfo[key]}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, [key]: e.target.value })
                  }
                  className="flex-1 outline-none text-xs sm:text-sm"
                  placeholder={placeholder}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary & Core Skills */}
      {[
        { title: "Summary", value: summary, setValue: setSummary },
        { title: "Core Skills", value: coreSkills, setValue: setCoreSkills },
      ].map(({ title, value, setValue }) => (
        <section key={title} className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{title}</h2>
          <TextEditor value={value} onChange={setValue} />
        </section>
      ))}

      {/* Experience */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          Experience
        </h2>
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="mb-5 p-3 sm:p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
              {[
                {
                  label: "Title",
                  field: "title",
                  placeholder: "Senior Database Administrator",
                },
                {
                  label: "Company Name",
                  field: "company",
                  placeholder: "Microsoft Corporation, Redmond, WA",
                },
                { label: "Start Date", field: "startDate", type: "date" },
                { label: "End Date", field: "endDate", type: "date" },
              ].map(({ label, field, type = "text", placeholder }) => (
                <div key={field}>
                  <label className="block text-xs sm:text-sm font-medium mb-1.5">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={exp[field]}
                    onChange={(e) =>
                      updateExperience(exp.id, field, e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5">
                Description
              </label>
              <textarea
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, "description", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm min-h-20 sm:min-h-24 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        ))}
        <button
          onClick={addExperience}
          className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Other Experience
        </button>
      </section>

      {/* Projects */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          Selected Project
        </h2>
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="mb-5 p-3 sm:p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) =>
                    updateProject(proj.id, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Senior Database Administrator"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5">
                  Description
                </label>
                <textarea
                  value={proj.description}
                  onChange={(e) =>
                    updateProject(proj.id, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm min-h-20 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Built 9-42 AD Topology..."
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addProject}
          className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Other Project
        </button>
      </section>

      {/* Education */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Education</h2>
        {education.map((edu) => (
          <div
            key={edu.id}
            className="mb-5 p-3 sm:p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  label: "Degree Name",
                  field: "degree",
                  placeholder: "Bsc In Computer Science",
                },
                {
                  label: "University Name",
                  field: "university",
                  placeholder: "University Of Washington, Seattle, WA",
                },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs sm:text-sm font-medium mb-1.5">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={edu[field]}
                    onChange={(e) =>
                      updateEducation(edu.id, field, e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={addEducation}
          className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Other Education
        </button>
      </section>

      {/* Certification */}
      <section className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          Certification
        </h2>
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="mb-5 p-3 sm:p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
          >
            <div className="mb-3">
              <label className="block text-xs sm:text-sm font-medium mb-1.5">
                Certification Name
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) =>
                  updateCertification(cert.id, "name", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bsc In Computer Science"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5">
                Details
              </label>
              <textarea
                value={cert.details}
                onChange={(e) =>
                  updateCertification(cert.id, "details", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm min-h-20 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add certification details..."
              />
            </div>
          </div>
        ))}
        <button
          onClick={addCertification}
          className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </section>

      {/* Submit Button */}
      <div className="flex justify-center sm:justify-end mb-8">
        <button className="px-8 sm:px-14 py-3 bg-[#123499] hover:bg-blue-700 text-white rounded-lg font-medium text-sm sm:text-base transition-all shadow-md hover:shadow-lg">
          Add Resume
        </button>
      </div>
    </div>
  );
};

export default AddNewResumeForm;
