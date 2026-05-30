
import { amenitiesData } from "../data/data.js";
// -------------------------
// Map through data and render UI
const container = document.getElementById('amenities-container');

container.innerHTML = amenitiesData.map(item => 
    `
      <div class="amenity-card flex flex-col items-center text-center group cursor-pointer p-4 w-full max-w-[160px] rounded-xl hover:bg-slate-100/60">
        <div class="w-20 h-20 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-xs group-hover:scale-105 group-hover:border-slate-400 group-hover:shadow-md transition-all duration-300">
          ${item.svg}
        </div>
        <span class="mt-4 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors duration-200 leading-tight">
          ${item.title}
        </span>
      </div>
    `).join('');

