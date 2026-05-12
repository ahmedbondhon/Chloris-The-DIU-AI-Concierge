import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, Award, BookOpen, Calendar, ShieldCheck, Camera, Edit2, X, Save, Upload } from 'lucide-react';
import Button from '../components/common/Button';

const Profile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [studentInfo, setStudentInfo] = useState({
        name: "John Doe",
        id: "211-15-12345",
        dept: "Computer Science & Engineering",
        semester: "8th (Final)",
        email: "john.doe@diu.edu.bd",
        phone: "+880 1712-345678",
        address: "Daffodil Smart City, Ashulia, Dhaka",
        gpa: "3.85",
        credits: "135 / 144",
        advisor: "Dr. Sheikh Abidul Islam",
        image: "https://i.pravatar.cc/300?u=john"
    });

    const [editForm, setEditForm] = useState({ ...studentInfo });

    const currentCourses = [
        { code: "CSE 431", name: "Software Engineering", instructor: "Prof. Zahid Hasan" },
        { code: "CSE 432", name: "Software Engineering Lab", instructor: "Prof. Zahid Hasan" },
        { code: "CSE 498", name: "Final Year Thesis", instructor: "Dr. Abidul Islam" }
    ];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStudentInfo(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setStudentInfo(editForm);
        setIsEditModalOpen(false);
    };

    return (
        <div className="space-y-10 pb-12 font-outfit">
            {/* Profile Header Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-black p-8 lg:p-12 text-white shadow-classic-xl animate-in fade-in zoom-in duration-700">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-2xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative group">
                        <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden ring-8 ring-white/5 shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                            <img
                                src={studentInfo.image}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-3 right-3 p-3 bg-white text-black rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all z-20 group/cam"
                            title="Change Profile Picture"
                            aria-label="Change Profile Picture"
                        >
                            <Camera size={20} className="group-hover/cam:rotate-12 transition-transform" />
                        </button>
                        <input
                            id="profile-image-upload"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                            title="Upload Profile Picture"
                            aria-label="Upload Profile Picture"
                        />
                    </div>

                    <div className="text-center md:text-left space-y-4">
                        <div className="space-y-1">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">{studentInfo.name}</h1>
                                <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/20 text-white/80">
                                    Active
                                </div>
                            </div>
                            <p className="text-white/60 text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                                <GraduationCap size={20} className="text-white/40" /> {studentInfo.id} • {studentInfo.dept}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setEditForm({ ...studentInfo });
                                    setIsEditModalOpen(true);
                                }}
                                className="bg-white/5 border-white/10 text-white hover:bg-white hover:text-slate-900 shadow-classic rounded-xl"
                            >
                                <Edit2 size={16} className="mr-2" /> Edit Profile
                            </Button>
                            <div className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 backdrop-blur-md rounded-xl border border-emerald-500/20 text-emerald-400 font-bold text-sm">
                                <ShieldCheck size={18} /> Verified Student
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Info */}
                <div className="lg:col-span-1 space-y-8 animate-in slide-in-from-left-8 duration-700">
                    {/* Academic Stats Quick Look */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-classic-lg space-y-8">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <Award className="text-white" size={24} />
                            Academic Snapshot
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center group hover:bg-white/10 transition-all hover:shadow-classic">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Current GPA</p>
                                <p className="text-2xl font-extrabold text-white">{studentInfo.gpa}</p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center group hover:bg-white/10 transition-all hover:shadow-classic">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Credits Done</p>
                                <p className="text-2xl font-extrabold text-white">{studentInfo.credits.split(' ')[0]}</p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white/40 font-medium">Advisor</span>
                                <span className="text-white font-bold">{studentInfo.advisor}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-white/40 font-medium">Semester</span>
                                <span className="text-white font-bold">{studentInfo.semester}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-classic-lg space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <User className="text-white" size={24} />
                            Contact Details
                        </h3>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                                    <Mail size={18} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Email Address</p>
                                    <p className="text-white font-bold truncate">{studentInfo.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Phone Number</p>
                                    <p className="text-white font-bold">{studentInfo.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Current Address</p>
                                    <p className="text-white font-bold leading-tight">{studentInfo.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Courses & Progress */}
                <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-right-8 duration-700">
                    {/* Current Semester Courses */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-classic-lg">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                                <BookOpen className="text-white" size={28} />
                                Enrolled Courses
                            </h2>
                            <span className="text-[10px] font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                {currentCourses.length} Total
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentCourses.map((course, idx) => (
                                <div key={idx} className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-white/20 hover:bg-white/10 hover:shadow-classic transition-all duration-300 group cursor-pointer">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                                            {course.code.split(' ')[1]}
                                        </div>
                                        <Calendar size={18} className="text-white/20" />
                                    </div>
                                    <h4 className="font-bold text-white mb-1">{course.name}</h4>
                                    <p className="text-[13px] font-medium text-white/40 flex items-center gap-2">
                                        <User size={14} /> {course.instructor}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Academic Timeline / Progress */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-classic-lg">
                        <h2 className="text-2xl font-bold text-white tracking-tight mb-8">Degree Progress</h2>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-3xl font-extrabold text-white tracking-tight">94% Complete</p>
                                        <p className="text-white/40 font-medium text-sm">Credits: 135 Completed / 144 required</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold tracking-wider uppercase text-xs">9 Credits Left</p>
                                    </div>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5">
                                    <div
                                        className="h-full bg-white rounded-full transition-all duration-1000 w-[94%]"
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Major</p>
                                    <p className="font-bold text-white">Software Engineering</p>
                                </div>
                                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Minor</p>
                                    <p className="font-bold text-white">Cyber Security</p>
                                </div>
                                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Status</p>
                                    <p className="font-bold text-emerald-400">On Track to Graduate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsEditModalOpen(false)}></div>

                    <div className="relative w-full max-w-2xl bg-black rounded-3xl shadow-classic-xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
                        {/* Modal Header */}
                        <div className="bg-black p-8 text-white relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                                        <Edit2 size={24} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight">Edit Profile</h2>
                                </div>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                                    title="Close modal"
                                    aria-label="Close modal"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="edit-name" className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Full Name</label>
                                    <input
                                        id="edit-name"
                                        type="text"
                                        placeholder="Full Name"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:bg-white/10 transition-all outline-none font-bold text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="edit-id" className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Student ID</label>
                                    <input
                                        id="edit-id"
                                        type="text"
                                        placeholder="Student ID"
                                        value={editForm.id}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, id: e.target.value }))}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:bg-white/10 transition-all outline-none font-bold text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="edit-email" className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Email Address</label>
                                    <input
                                        id="edit-email"
                                        type="email"
                                        placeholder="Email Address"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:bg-white/10 transition-all outline-none font-bold text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="edit-phone" className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Phone Number</label>
                                    <input
                                        id="edit-phone"
                                        type="text"
                                        placeholder="Phone Number"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:bg-white/10 transition-all outline-none font-bold text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="edit-address" className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Current Address</label>
                                <textarea
                                    id="edit-address"
                                    placeholder="Current Address"
                                    value={editForm.address}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:bg-white/10 transition-all outline-none font-bold text-white min-h-[100px] resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="edit-advisor" className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Advisor Name</label>
                                    <input
                                        id="edit-advisor"
                                        type="text"
                                        placeholder="Advisor Name"
                                        value={editForm.advisor}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, advisor: e.target.value }))}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:bg-white/10 transition-all outline-none font-bold text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="edit-dept" className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-2">Department</label>
                                    <input
                                        id="edit-dept"
                                        type="text"
                                        placeholder="Department"
                                        value={editForm.dept}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, dept: e.target.value }))}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-white/30 focus:bg-white/10 transition-all outline-none font-bold text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 bg-black border-t border-white/10 flex gap-4">
                            <Button
                                variant="secondary"
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 bg-white/5 border-white/10 text-white/60 hover:bg-white/10 px-0 rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="flex-1 px-0 shadow-classic-lg shadow-white/10 rounded-xl bg-white text-black hover:bg-white/90"
                            >
                                <Save size={18} className="mr-2" /> Save Changes
                            </Button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Profile;
