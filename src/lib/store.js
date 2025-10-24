import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateColorScale } from './tokens';

const useStore = create(
  persist(
    (set, get) => ({
      // Design Systems
      designSystems: [],
      activeSystemId: null,

      // Settings
      settings: {
        projectName: 'My Design System',
        logoUrl: '',
        githubToken: '',
        githubRepo: '',
        authorName: 'Designer',
        authorEmail: 'designer@local',
      },

      // UI State
      darkMode: false,
      sidebarOpen: true,
      searchQuery: '',

      // Generated Components (from AI)
      generatedComponents: [],

      // Actions: Design Systems
      addDesignSystem: (system) => {
        const newSystem = {
          ...system,
          id: system.id || Date.now().toString(),
          createdAt: system.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          designSystems: [...state.designSystems, newSystem],
          activeSystemId: newSystem.id,
        }));
        return newSystem;
      },

      updateDesignSystem: (id, updates) => {
        set((state) => ({
          designSystems: state.designSystems.map((system) =>
            system.id === id
              ? { ...system, ...updates, updatedAt: new Date().toISOString() }
              : system
          ),
        }));
      },

      deleteDesignSystem: (id) => {
        set((state) => ({
          designSystems: state.designSystems.filter((system) => system.id !== id),
          activeSystemId: state.activeSystemId === id ? null : state.activeSystemId,
        }));
      },

      setActiveSystem: (id) => {
        set({ activeSystemId: id });
      },

      getActiveSystem: () => {
        const state = get();
        return state.designSystems.find((system) => system.id === state.activeSystemId);
      },

      // Actions: Active System Updates
      updateColors: (colorName, baseHex) => {
        const state = get();
        const activeSystem = state.getActiveSystem();
        if (!activeSystem) return;

        const colorScale = generateColorScale(baseHex, colorName);
        const updatedColors = {
          ...activeSystem.colors,
          ...colorScale,
        };

        state.updateDesignSystem(activeSystem.id, { colors: updatedColors });
      },

      updateTypography: (updates) => {
        const state = get();
        const activeSystem = state.getActiveSystem();
        if (!activeSystem) return;

        const updatedTypography = {
          ...activeSystem.typography,
          ...updates,
        };

        state.updateDesignSystem(activeSystem.id, { typography: updatedTypography });
      },

      updateSpacing: (updates) => {
        const state = get();
        const activeSystem = state.getActiveSystem();
        if (!activeSystem) return;

        const updatedSpacing = {
          ...activeSystem.spacing,
          ...updates,
        };

        state.updateDesignSystem(activeSystem.id, { spacing: updatedSpacing });
      },

      // Actions: Settings
      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },

      // Actions: UI State
      toggleDarkMode: () => {
        set((state) => ({ darkMode: !state.darkMode }));
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      // Actions: Generated Components
      addGeneratedComponent: (component) => {
        set((state) => ({
          generatedComponents: [
            ...state.generatedComponents,
            { ...component, id: Date.now().toString() },
          ],
        }));
      },

      removeGeneratedComponent: (id) => {
        set((state) => ({
          generatedComponents: state.generatedComponents.filter((comp) => comp.id !== id),
        }));
      },

      clearGeneratedComponents: () => {
        set({ generatedComponents: [] });
      },

      // Initialize with predefined systems
      initializePredefined: (predefinedSystems) => {
        const state = get();
        if (state.designSystems.length === 0) {
          set({
            designSystems: predefinedSystems,
            activeSystemId: predefinedSystems[0]?.id || null,
          });
        }
      },
    }),
    {
      name: 'design-system-storage',
      partialize: (state) => ({
        designSystems: state.designSystems,
        activeSystemId: state.activeSystemId,
        settings: state.settings,
        darkMode: state.darkMode,
      }),
    }
  )
);

export default useStore;
