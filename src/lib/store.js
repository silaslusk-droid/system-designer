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
      },

      // UI State
      darkMode: false,
      sidebarOpen: true,

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

      // Actions: Settings
      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },

      // Actions: UI State
      toggleDarkMode: () => {
        set((state) => {
          const newMode = !state.darkMode;
          // Update document class
          if (newMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { darkMode: newMode };
        });
      },

      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
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
