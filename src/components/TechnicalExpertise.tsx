"use client";

import { useState, useMemo } from 'react';
import { TECHNICAL_PROFICIENCIES } from '@/config/constants';
import { getTagColor } from '@/config/tags';
import GlassCard from '@/components/ui/GlassCard';

// Generate unique tags with counts and sort them
const getAllTagsWithCounts = () => {
  const tagCounts = new Map<string, number>();
  TECHNICAL_PROFICIENCIES.forEach(skill => {
    skill.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  // Filter out tags with only 1 item and sort alphabetically
  return Array.from(tagCounts.entries())
    .filter(([_, count]) => count > 1)
    .sort(([a], [b]) => a.localeCompare(b));
};

export default function TechnicalExpertise() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allTagsWithCounts = useMemo(() => getAllTagsWithCounts(), []);

  // Filter skills based on search and selected tag
  const filteredSkills = useMemo(() => {
    return TECHNICAL_PROFICIENCIES.filter(skill => {
      // Tag filter
      if (selectedTag && !skill.tags.includes(selectedTag)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          skill.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search and Filter Controls */}
      <GlassCard className="p-6 mb-8">
        <div className="space-y-4">
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="Search by name, description, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-neutral-sub border border-text-low/30 text-high placeholder:text-med focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
            />
          </div>

          {/* Tag Filters */}
          <div className="space-y-2">
            <div className="text-sm text-med mb-2">Filter by tag:</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200
                  ${selectedTag === null 
                    ? 'bg-accent text-high border-accent' 
                    : 'bg-transparent text-med border-text-low/30 hover:border-text-med hover:text-high'
                  }
                `}
              >
                All
              </button>
              {allTagsWithCounts.map(([tag, count]) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200
                    ${selectedTag === tag 
                      ? getTagColor(tag) + ' opacity-100' 
                      : getTagColor(tag) + ' opacity-60 hover:opacity-100'
                    }
                  `}
                >
                  {tag} ({count})
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-med">
            Showing {filteredSkills.length} of {TECHNICAL_PROFICIENCIES.length} skills
          </div>
        </div>
      </GlassCard>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <GlassCard 
            key={skill.name} 
            className="p-6 hover:shadow-accent transition-all duration-300 hover:-translate-y-1"
          >
            <h4 className="text-xl font-semibold text-high mb-2">{skill.name}</h4>
            <p className="text-med mb-4 text-sm">{skill.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {skill.tags.sort().map(tag => (
                <span
                  key={tag}
                  className={`
                    px-2 py-1 rounded-full text-xs font-medium border
                    ${getTagColor(tag)}
                    ${selectedTag === tag ? 'ring-2 ring-accent ring-offset-2 ring-offset-neutral' : ''}
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* No Results Message */}
      {filteredSkills.length === 0 && (
        <GlassCard className="p-12 text-center">
          <p className="text-med text-lg">
            No skills found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
            className="mt-4 text-accent hover:text-accent-contrast transition-colors duration-200"
          >
            Clear filters
          </button>
        </GlassCard>
      )}
    </div>
  );
}