import React, { useState, useEffect, useRef } from 'react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { FeaturedProject } from '../types';
import { 
  Layers, 
  ExternalLink, 
  Github, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Bot, 
  Loader2, 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Image as ImageIcon, 
  Film 
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectsSectionProps {
  onOpenAssistantWithTopic: (topic: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenAssistantWithTopic }) => {
  const [activeProject, setActiveProject] = useState<FeaturedProject | null>(null);
  const [architectureExplanation, setArchitectureExplanation] = useState<string | null>(null);
  const [loadingArch, setLoadingArch] = useState(false);

  // Video Preview States
  const [activeMediaTab, setActiveMediaTab] = useState<{ [id: string]: 'image' | 'video' }>({});
  const [playingVideos, setPlayingVideos] = useState<{ [id: string]: boolean }>({});
  const [mutedVideos, setMutedVideos] = useState<{ [id: string]: boolean }>({});
  const [videoModalProject, setVideoModalProject] = useState<FeaturedProject | null>(null);

  const videoRefs = useRef<{ [id: string]: HTMLVideoElement | null }>({});

  // Handle Escape key & body scroll lock for modals
  useEffect(() => {
    const isAnyModalOpen = Boolean(activeProject || videoModalProject);
    if (!isAnyModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
        setVideoModalProject(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject, videoModalProject]);

  const handleExplainArchitecture = async (project: FeaturedProject) => {
    setActiveProject(project);
    setLoadingArch(true);
    setArchitectureExplanation(null);

    try {
      const res = await fetch('/api/explain-architecture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: project.name,
          problemStatement: project.problemStatement,
          technicalSolution: project.technicalSolution,
          techStack: project.techStack,
        }),
      });

      const data = await res.json();
      setArchitectureExplanation(data.explanation || 'Architecture breakdown loaded.');
    } catch (err) {
      setArchitectureExplanation('Failed to fetch AI architectural breakdown. Feel free to ask the AI Assistant directly!');
    } finally {
      setLoadingArch(false);
    }
  };

  const togglePlayVideo = (projectId: string) => {
    const vid = videoRefs.current[projectId];
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setPlayingVideos((prev) => ({ ...prev, [projectId]: true }));
    } else {
      vid.pause();
      setPlayingVideos((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  const toggleMuteVideo = (projectId: string) => {
    const vid = videoRefs.current[projectId];
    if (!vid) return;

    vid.muted = !vid.muted;
    setMutedVideos((prev) => ({ ...prev, [projectId]: vid.muted }));
  };

  return (
    <section id="projects" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="space-y-1.5 sm:space-y-2 mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center space-x-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 sm:px-3 py-1 rounded-md border border-indigo-100 dark:border-indigo-800/50">
            <Layers className="w-3.5 h-3.5" />
            <span>Section 04 — Production Deliverables</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Projects & Engineering Deep-Dives
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Real-world full-stack platforms engineered for event-driven microservices with orchestrated Sagas, reliable healthcare operations (HIS/LIS), and live turf bookings on IIS.
          </p>
        </motion.div>

        {/* Featured Projects Cards Loop */}
        <div className="space-y-10 sm:space-y-14">
          {FEATURED_PROJECTS.map((project, index) => {
            const currentMediaTab = activeMediaTab[project.id] || 'video';
            const isPlaying = Boolean(playingVideos[project.id]);
            const isMuted = mutedVideos[project.id] !== false;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-slate-200 dark:border-slate-700/60 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-600/50 transition-all space-y-6 sm:space-y-8"
              >
                
                {/* Project Title Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-700/60">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/50 px-2 sm:px-2.5 py-0.5 rounded">
                        0{index + 1} // {project.category}
                      </span>
                      {project.id === 'project-1' && (
                        <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          Live Site ↗
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Actions: Watch Demo, AI Deep-Dive, Ask AI */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {project.videoUrl && (
                      <button
                        onClick={() => setVideoModalProject(project)}
                        className="flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white text-[11px] sm:text-xs font-bold shadow-xs transition-all cursor-pointer group touch-manipulation min-h-[38px]"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-indigo-400 dark:text-indigo-200 group-hover:scale-110 transition-transform" />
                        <span>Watch Demo</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleExplainArchitecture(project)}
                      className="flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] sm:text-xs font-bold shadow-xs transition-colors cursor-pointer touch-manipulation min-h-[38px]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Architecture AI</span>
                    </button>

                    <button
                      onClick={() => onOpenAssistantWithTopic(`Tell me about the engineering highlights in ${project.name}`)}
                      className="flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-[11px] sm:text-xs font-semibold cursor-pointer touch-manipulation min-h-[38px]"
                    >
                      <Bot className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Ask AI</span>
                    </button>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 transition-colors touch-manipulation min-h-[38px] min-w-[38px] flex items-center justify-center"
                        title="Live Deployment Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 transition-colors touch-manipulation min-h-[38px] min-w-[38px] flex items-center justify-center"
                        title="Source Code Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Media Showcase: Split Switcher (Interactive Video Preview vs Screenshot) */}
                <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-lg relative group">
                  
                  {/* Media Switcher Tab Controls */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex items-center space-x-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 text-[11px] sm:text-xs font-semibold text-white">
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab((prev) => ({ ...prev, [project.id]: 'video' }))}
                      className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        currentMediaTab === 'video'
                          ? 'bg-indigo-600 text-white shadow-xs font-bold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>Video Demo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveMediaTab((prev) => ({ ...prev, [project.id]: 'image' }));
                        const vid = videoRefs.current[project.id];
                        if (vid) vid.pause();
                        setPlayingVideos((prev) => ({ ...prev, [project.id]: false }));
                      }}
                      className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        currentMediaTab === 'image'
                          ? 'bg-indigo-600 text-white shadow-xs font-bold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Screenshot</span>
                    </button>
                  </div>

                  {/* Theater Mode Button (Top Right) */}
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20">
                    <button
                      type="button"
                      onClick={() => setVideoModalProject(project)}
                      className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white hover:bg-indigo-600 text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer touch-manipulation"
                      title="Open Fullscreen Video Theater"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Theater</span>
                    </button>
                  </div>

                  {/* Media Content Display Area */}
                  <div className="relative aspect-video max-h-[360px] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                    
                    {/* Mode A: Video Preview Player */}
                    {currentMediaTab === 'video' ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <video
                          ref={(el) => { videoRefs.current[project.id] = el; }}
                          src={project.videoUrl}
                          poster={project.videoPoster || project.image}
                          loop
                          muted={isMuted}
                          playsInline
                          onPlay={() => setPlayingVideos((prev) => ({ ...prev, [project.id]: true }))}
                          onPause={() => setPlayingVideos((prev) => ({ ...prev, [project.id]: false }))}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => togglePlayVideo(project.id)}
                        />

                        {/* Floating Play/Pause Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none flex items-center justify-center">
                          {!isPlaying && (
                            <button
                              type="button"
                              onClick={() => togglePlayVideo(project.id)}
                              className="pointer-events-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all transform hover:scale-110 cursor-pointer"
                              title="Play Video Demo"
                            >
                              <Play className="w-5 h-5 sm:w-7 sm:h-7 fill-current ml-0.5 sm:ml-1 text-white" />
                            </button>
                          )}
                        </div>

                        {/* Bottom Video Floating Controls Bar */}
                        <div className="absolute bottom-2 inset-x-2 sm:bottom-3 sm:inset-x-3 z-20 flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <button
                              type="button"
                              onClick={() => togglePlayVideo(project.id)}
                              className="p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer text-indigo-400 hover:text-indigo-300"
                              title={isPlaying ? 'Pause' : 'Play'}
                            >
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleMuteVideo(project.id)}
                              className="p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer text-slate-300 hover:text-white"
                              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                            >
                              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                            </button>

                            <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono hidden sm:inline">
                              {isPlaying ? '▶ Playing Walkthrough' : '⏸ Paused'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-indigo-950/70 border border-indigo-800/60 text-indigo-300 text-[9px] sm:text-[10px] font-mono font-bold">
                              HD 1080p
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Mode B: Static Screenshot */
                      <div className="relative w-full h-full group">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-2">
                          <button
                            type="button"
                            onClick={() => setActiveMediaTab((prev) => ({ ...prev, [project.id]: 'video' }))}
                            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg flex items-center space-x-2 cursor-pointer"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            <span>Switch to Video Walkthrough</span>
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Grid Body: Problem & Solution vs Engineering Challenges */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                  
                  {/* Left Side: Problem Statement & Technical Solution (Col 6) */}
                  <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                    
                    {/* Problem Statement Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center space-x-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span>1. Problem Statement</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                        {project.problemStatement}
                      </p>
                    </div>

                    {/* Technical Solution Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>2. Technical Solution & Architecture</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                        {project.technicalSolution}
                      </p>
                    </div>

                    {/* Key Features Bullet List */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Key Features & Capabilities
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {project.keyFeatures.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Used Tags */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Tech Stack Used
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-mono text-[11px] sm:text-xs font-medium shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Side: Key Engineering Challenges & Metrics (Col 6) */}
                  <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                    
                    {/* Engineering Challenges List */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-1 border-b border-slate-200 dark:border-slate-700/60">
                        Key Engineering Challenges & Solutions
                      </h4>

                      {project.engineeringChallenges.map((ec, ecIdx) => (
                        <div
                          key={ecIdx}
                          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/60 shadow-2xs space-y-1.5 sm:space-y-2"
                        >
                          <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm text-rose-900 dark:text-rose-300 flex items-start space-x-1.5 sm:space-x-2">
                            <span className="text-rose-600 dark:text-rose-400 shrink-0 font-mono">[{ecIdx + 1}]</span>
                            <span>{ec.challenge}</span>
                          </div>

                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-4 sm:pl-5">
                            <strong className="text-indigo-700 dark:text-indigo-400 font-semibold">Solution: </strong>
                            {ec.solution}
                          </p>

                          <div className="pl-4 sm:pl-5 pt-0.5">
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-[10px] sm:text-[11px] font-mono font-bold">
                              <Zap className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
                              <span>Impact: {ec.impact}</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Measurable Project Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 sm:pt-2">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 sm:p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 text-center space-y-0.5">
                          <div className="text-sm sm:text-base lg:text-lg font-black text-slate-900 dark:text-white">{m.value}</div>
                          <div className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">{m.label}</div>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* 1. Fullscreen Video Theater Lightbox Modal */}
      {videoModalProject && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md p-2 sm:p-4 md:p-8"
          onClick={(e) => { if (e.target === e.currentTarget) setVideoModalProject(null); }}
        >
          <div className="min-h-full flex items-center justify-center py-2 sm:py-4">
            <div className="bg-slate-900 rounded-2xl sm:rounded-3xl max-w-4xl w-full p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-2xl border border-slate-800 text-white relative">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 gap-2">
                <div className="space-y-0.5 sm:space-y-1 min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60 inline-block">
                    {videoModalProject.category} // Video Demo
                  </span>
                  <h3 className="text-base sm:text-xl font-black text-white truncate">
                    {videoModalProject.name}
                  </h3>
                </div>

                <button
                  onClick={() => setVideoModalProject(null)}
                  aria-label="Close video modal"
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theater Video Player */}
              <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
                <video
                  src={videoModalProject.videoUrl}
                  poster={videoModalProject.videoPoster || videoModalProject.image}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Video Project Meta & Summary */}
              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {videoModalProject.technicalSolution}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-slate-800">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {videoModalProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] sm:text-[11px] font-mono border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    {videoModalProject.liveDemoUrl && (
                      <a
                        href={videoModalProject.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit Live Site</span>
                      </a>
                    )}

                    <button
                      onClick={() => setVideoModalProject(null)}
                      className="px-3.5 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. AI Architecture Deep-Dive Modal */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 dark:bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6"
          onClick={(e) => { if (e.target === e.currentTarget) setActiveProject(null); }}
        >
          <div className="min-h-full flex items-start sm:items-center justify-center py-2 sm:py-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl max-w-3xl w-full p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700 relative my-auto">
              
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-700 gap-2">
                <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-base truncate">
                      Architecture: {activeProject.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      Gemini AI Systems Analysis
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  aria-label="Close architecture breakdown"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {loadingArch ? (
                <div className="py-10 sm:py-12 flex flex-col items-center justify-center space-y-3 text-indigo-600 dark:text-indigo-400 text-center px-4">
                  <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin" />
                  <span className="text-xs font-bold">Formulating system trade-offs & pipeline breakdown...</span>
                </div>
              ) : (
                <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-800 dark:text-slate-200 space-y-3 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm max-h-[60vh] overflow-y-auto">
                  {architectureExplanation}
                </div>
              )}

              <div className="pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-indigo-500 cursor-pointer shadow-xs transition-colors"
                >
                  Close Breakdown
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
