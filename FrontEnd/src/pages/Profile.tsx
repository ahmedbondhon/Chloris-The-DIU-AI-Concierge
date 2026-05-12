import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, Award, BookOpen, Calendar, ShieldCheck, Camera, Edit2, X, Save } from 'lucide-react';
import RetroButton from '../components/retro/RetroButton';
import RetroInput from '../components/retro/RetroInput';
import RetroCard from '../components/retro/RetroCard';

const Profile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [studentInfo, setStudentInfo] = useState({
        name: "Tonmoy",
        id: "211-15-12345",
        dept: "Computer Science & Engineering",
        semester: "8th (Final)",
        email: "john.doe@diu.edu.bd",
        phone: "+880 1712-345678",
        address: "Daffodil Smart City, Ashulia, Dhaka",
        gpa: "3.85",
        credits: "135 / 144",
        advisor: "Dr. Sheikh Abidul Islam",
        image: ""
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
        <div className="space-y-8 pb-10 font-sora bg-[#0A0A0C] min-h-screen">
            {/* Profile Header Hero */}
            <RetroCard variant="modern-3d" className="relative overflow-hidden rounded-[2rem] border-white/5 p-6 lg:p-8 text-text-primary shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32 blur-2xl opacity-20"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative group">
                        <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden ring-4 ring-white/5 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] border border-white/10 bg-[#111113] flex items-center justify-center">
                            {studentInfo.image ? (
                                <img
                                    src={studentInfo.image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/30 group-hover:text-primary transition-colors">
                                    <User size={48} strokeWidth={1.5} />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-1 right-1 p-2 bg-primary text-white rounded-lg shadow-xl hover:scale-110 active:scale-95 transition-all z-20 group/cam border border-primary/20"
                            title="Change Profile Picture"
                            aria-label="Change Profile Picture"
                        >
                            <Camera size={16} className="group-hover/cam:rotate-12 transition-transform" />
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
                                <h1 className="text-3xl lg:text-3xl font-extrabold tracking-tight text-text-primary">{studentInfo.name}</h1>
                                <div className="px-3 py-1 bg-primary/10 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-widest border border-primary/20 text-primary">
                                    Active
                                </div>
                            </div>
                            <p className="text-text-muted text-sm font-medium flex items-center justify-center md:justify-start gap-2 opacity-60">
                                <GraduationCap size={16} className="text-primary/40" /> {studentInfo.id} • {studentInfo.dept}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                            <RetroButton
                                variant="secondary"
                                onClick={() => {
                                    setEditForm({ ...studentInfo });
                                    setIsEditModalOpen(true);
                                }}
                                className="shadow-xl rounded-xl border-white/10 bg-[#111113] px-6 py-2.5 text-xs"
                            >
                                <Edit2 size={16} className="mr-2" /> Edit Profile
                            </RetroButton>
                            <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 backdrop-blur-md rounded-xl border border-emerald-500/20 text-emerald-400 font-bold text-[10px] tracking-widest uppercase">
                                <ShieldCheck size={16} /> Verified Student
                            </div>
                        </div>
                    </div>
                </div>
            </RetroCard>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Info */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Academic Stats Quick Look */}
                    <RetroCard variant="modern-3d" className="p-8 rounded-[2rem] border-white/5 space-y-8 shadow-2xl">
                        <h3 className="text-xl font-bold text-text-primary flex items-center gap-3 uppercase tracking-[0.2em] text-xs">
                            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                <Award size={18} />
                            </div>
                            Academic Snapshot
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#111113] p-5 rounded-3xl border border-white/5 text-center group hover:bg-primary/5 transition-all">
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1 shadow-sm opacity-40">Current GPA</p>
                                <p className="text-xl font-extrabold text-text-primary">{studentInfo.gpa}</p>
                            </div>
                            <div className="bg-[#111113] p-5 rounded-3xl border border-white/5 text-center group hover:bg-primary/5 transition-all">
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1 shadow-sm opacity-40">Credits Done</p>
                                <p className="text-xl font-extrabold text-text-primary">{studentInfo.credits.split(' ')[0]}</p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-muted font-bold uppercase tracking-widest text-[9px] opacity-40">Advisor</span>
                                <span className="text-text-primary font-bold">{studentInfo.advisor}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-muted font-bold uppercase tracking-widest text-[9px] opacity-40">Semester</span>
                                <span className="text-text-primary font-bold">{studentInfo.semester}</span>
                            </div>
                        </div>
                    </RetroCard>

                    {/* Contact Details */}
                    <RetroCard variant="modern-3d" className="p-8 rounded-[2rem] border-white/5 space-y-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-text-primary flex items-center gap-3 uppercase tracking-[0.2em] text-xs">
                            <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                                <User size={18} />
                            </div>
                            Contact Details
                        </h3>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all border border-primary/5 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                                    <Mail size={18} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40">Email Address</p>
                                    <p className="text-text-primary font-bold truncate">{studentInfo.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all border border-amber-500/5 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40">Phone Number</p>
                                    <p className="text-text-primary font-bold">{studentInfo.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all border border-cyan-500/5 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40">Current Address</p>
                                    <p className="text-text-primary font-bold leading-tight">{studentInfo.address}</p>
                                </div>
                            </div>
                        </div>
                    </RetroCard>
                </div>

                {/* Right Column: Courses & Progress */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Current Semester Courses */}
                    <RetroCard variant="modern-3d" className="p-8 rounded-[2.5rem] border-white/5 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-4 uppercase tracking-[0.2em] text-sm">
                                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                                    <BookOpen size={24} />
                                </div>
                                Enrolled Courses
                            </h2>
                            <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-xl uppercase tracking-widest">
                                {currentCourses.length} Total
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentCourses.map((course, idx) => (
                                <div key={idx} className="p-6 bg-[#111113] border border-white/5 rounded-[1.5rem] hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group cursor-pointer shadow-xl shadow-black/20">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold group-hover:scale-110 transition-transform border border-primary/5">
                                            {course.code.split(' ')[1]}
                                        </div>
                                        <Calendar size={18} className="text-text-muted/20" />
                                    </div>
                                    <h4 className="font-bold text-text-primary mb-1 uppercase tracking-widest text-xs">{course.name}</h4>
                                    <p className="text-[13px] font-medium text-text-muted flex items-center gap-2 uppercase tracking-widest text-[9px] opacity-40">
                                        <User size={14} className="text-primary/60" /> {course.instructor}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </RetroCard>

                    {/* Academic Timeline / Progress */}
                    <RetroCard variant="modern-3d" className="p-8 rounded-[2.5rem] border-white/5 shadow-2xl">
                        <h2 className="text-2xl font-bold text-text-primary tracking-tight mb-8 uppercase tracking-[0.2em] text-sm">Degree Progress</h2>
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-2xl font-extrabold text-text-primary tracking-tight">94% Complete</p>
                                        <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest opacity-40">Credits: 135 Completed / 144 required</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-primary font-bold tracking-widest uppercase text-xs">9 Credits Left</p>
                                    </div>
                                </div>
                                <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-1000 w-[94%] shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                <div className="p-5 bg-[#111113] rounded-2xl border border-white/5 space-y-1 shadow-lg">
                                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40">Major</p>
                                    <p className="font-bold text-text-primary uppercase tracking-widest text-[10px]">Software Engineering</p>
                                </div>
                                <div className="p-5 bg-[#111113] rounded-2xl border border-white/5 space-y-1 shadow-lg">
                                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40">Minor</p>
                                    <p className="font-bold text-text-primary uppercase tracking-widest text-[10px]">Cyber Security</p>
                                </div>
                                <div className="p-5 bg-[#111113] rounded-2xl border border-white/5 space-y-1 shadow-lg">
                                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-40">Status</p>
                                    <p className="font-bold text-emerald-400 uppercase tracking-widest text-[9px] shadow-[0_0_10px_rgba(52,211,153,0.2)]">On Track to Graduate</p>
                                </div>
                            </div>
                        </div>
                    </RetroCard>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0A0A0C]/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsEditModalOpen(false)}></div>

                    <RetroCard variant="modern-3d" className="relative w-full max-w-2xl !rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/5 p-0">
                        {/* Modal Header */}
                        <div className="p-8 text-text-primary relative border-b border-white/5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl opacity-20"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 backdrop-blur-md flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                        <Edit2 size={24} className="text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-[0.2em] uppercase text-sm">Edit Profile</h2>
                                </div>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="p-2.5 bg-white/5 hover:bg-primary/10 text-text-muted hover:text-primary rounded-xl transition-all border border-white/10"
                                    title="Close modal"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-2 opacity-50">Full Name</label>
                                    <RetroInput
                                        placeholder="Full Name"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-2 opacity-50">Student ID</label>
                                    <RetroInput
                                        placeholder="Student ID"
                                        value={editForm.id}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, id: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-2 opacity-50">Email Address</label>
                                    <RetroInput
                                        type="email"
                                        placeholder="Email Address"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-2 opacity-50">Phone Number</label>
                                    <RetroInput
                                        placeholder="Phone Number"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-2 opacity-50">Current Address</label>
                                <textarea
                                    placeholder="Current Address"
                                    value={editForm.address}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary focus:bg-primary/5 transition-all outline-none font-bold text-text-primary min-h-[100px] resize-none shadow-sm"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-2 opacity-50">Advisor Name</label>
                                    <RetroInput
                                        placeholder="Advisor Name"
                                        value={editForm.advisor}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, advisor: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-2 opacity-50">Department</label>
                                    <RetroInput
                                        placeholder="Department"
                                        value={editForm.dept}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, dept: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 bg-transparent border-t border-white/5 flex gap-4">
                            <RetroButton
                                variant="secondary"
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex-1 bg-white/5 border-white/10 text-text-muted hover:bg-white/10 px-0 rounded-2xl shadow-sm uppercase tracking-widest text-[9px]"
                            >
                                Cancel
                            </RetroButton>
                            <RetroButton
                                onClick={handleSave}
                                variant="primary"
                                className="flex-1 px-0 shadow-xl shadow-primary/20 rounded-2xl"
                            >
                                <Save size={18} className="mr-2" /> Save Changes
                            </RetroButton>
                        </div>
                    </RetroCard>
                </div>
            )}
        </div>
    );
};

export default Profile;
