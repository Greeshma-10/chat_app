"use client"


import { useState, useEffect } from 'react';
import styles from '/styles/Groups.module.css'; // Importing the styles
import Link from 'next/link'; // Import Link for navigation

const groupsData = [
  { id: 1, name: 'Women Health Awareness', description: 'A group focused on women\'s health education.' },
  { id: 2, name: 'Mental Wellness for Women', description: 'Discussing mental health issues faced by women.' },
  { id: 3, name: 'Nutrition and Fitness', description: 'Sharing tips for healthy living.' },
  // Add more groups as needed
];

export default function Groups() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(groupsData);

  useEffect(() => {
    // Filter groups based on the search term
    const results = groupsData.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGroups(results);
  }, [searchTerm]);

  return (
    <div className={styles.groupsContainer}>
      <h1 className={styles.title}>Groups Related to Women's Health Assistance</h1>
      <input
        type="text"
        placeholder="Search for groups..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.groupsList}>
        {filteredGroups.map(group => (
          <li key={group.id} className={styles.groupItem}>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
        
            <Link href={`/chat/${group.id}`}>
                <button className={styles.joinButton}>Join Group</button>
            </Link>

          </li>
        ))}
      </ul>
    </div>
  );
}
