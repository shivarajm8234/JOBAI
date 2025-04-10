import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Plus, Download, Trash2, Award, Book, Briefcase } from 'lucide-react-native';

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState<'personal' | 'education' | 'experience' | 'skills'>('personal');
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
  });
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      year: '',
    };
    setEducation([...education, newEducation]);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: '',
    };
    setExperience([...experience, newExperience]);
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Beginner',
    };
    setSkills([...skills, newSkill]);
  };

  const SectionButton = ({ title, icon, isActive, onPress }: { 
    title: string;
    icon: React.ReactNode;
    isActive: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.sectionButton, isActive && styles.sectionButtonActive]}
      onPress={onPress}>
      {icon}
      <Text style={[styles.sectionButtonText, isActive && styles.sectionButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resume Builder</Text>
        <Text style={styles.headerSubtitle}>Create your professional resume</Text>
      </View>

      <View style={styles.sectionTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <SectionButton
            title="Personal"
            icon={<Award size={20} color={activeSection === 'personal' ? '#007AFF' : '#666'} />}
            isActive={activeSection === 'personal'}
            onPress={() => setActiveSection('personal')}
          />
          <SectionButton
            title="Education"
            icon={<Book size={20} color={activeSection === 'education' ? '#007AFF' : '#666'} />}
            isActive={activeSection === 'education'}
            onPress={() => setActiveSection('education')}
          />
          <SectionButton
            title="Experience"
            icon={<Briefcase size={20} color={activeSection === 'experience' ? '#007AFF' : '#666'} />}
            isActive={activeSection === 'experience'}
            onPress={() => setActiveSection('experience')}
          />
          <SectionButton
            title="Skills"
            icon={<Award size={20} color={activeSection === 'skills' ? '#007AFF' : '#666'} />}
            isActive={activeSection === 'skills'}
            onPress={() => setActiveSection('skills')}
          />
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {activeSection === 'personal' && (
          <View style={styles.section}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={personalInfo.name}
                onChangeText={(text) => setPersonalInfo({ ...personalInfo, name: text })}
                placeholder="Enter your full name"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={personalInfo.email}
                onChangeText={(text) => setPersonalInfo({ ...personalInfo, email: text })}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={personalInfo.phone}
                onChangeText={(text) => setPersonalInfo({ ...personalInfo, phone: text })}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Professional Summary</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={personalInfo.summary}
                onChangeText={(text) => setPersonalInfo({ ...personalInfo, summary: text })}
                placeholder="Write a brief professional summary"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        )}

        {activeSection === 'education' && (
          <View style={styles.section}>
            {education.map((edu, index) => (
              <View key={edu.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Education #{index + 1}</Text>
                  <TouchableOpacity
                    onPress={() => setEducation(education.filter(e => e.id !== edu.id))}
                    style={styles.deleteButton}>
                    <Trash2 size={20} color="#ff3b30" />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>School/University</Text>
                  <TextInput
                    style={styles.input}
                    value={edu.school}
                    onChangeText={(text) => {
                      const newEducation = [...education];
                      newEducation[index].school = text;
                      setEducation(newEducation);
                    }}
                    placeholder="Enter school name"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Degree</Text>
                  <TextInput
                    style={styles.input}
                    value={edu.degree}
                    onChangeText={(text) => {
                      const newEducation = [...education];
                      newEducation[index].degree = text;
                      setEducation(newEducation);
                    }}
                    placeholder="Enter degree"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Year</Text>
                  <TextInput
                    style={styles.input}
                    value={edu.year}
                    onChangeText={(text) => {
                      const newEducation = [...education];
                      newEducation[index].year = text;
                      setEducation(newEducation);
                    }}
                    placeholder="Enter year"
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addEducation}>
              <Plus size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Education</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeSection === 'experience' && (
          <View style={styles.section}>
            {experience.map((exp, index) => (
              <View key={exp.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Experience #{index + 1}</Text>
                  <TouchableOpacity
                    onPress={() => setExperience(experience.filter(e => e.id !== exp.id))}
                    style={styles.deleteButton}>
                    <Trash2 size={20} color="#ff3b30" />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Company</Text>
                  <TextInput
                    style={styles.input}
                    value={exp.company}
                    onChangeText={(text) => {
                      const newExperience = [...experience];
                      newExperience[index].company = text;
                      setExperience(newExperience);
                    }}
                    placeholder="Enter company name"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Position</Text>
                  <TextInput
                    style={styles.input}
                    value={exp.position}
                    onChangeText={(text) => {
                      const newExperience = [...experience];
                      newExperience[index].position = text;
                      setExperience(newExperience);
                    }}
                    placeholder="Enter position"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Duration</Text>
                  <TextInput
                    style={styles.input}
                    value={exp.duration}
                    onChangeText={(text) => {
                      const newExperience = [...experience];
                      newExperience[index].duration = text;
                      setExperience(newExperience);
                    }}
                    placeholder="Enter duration (e.g., Jan 2020 - Present)"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={exp.description}
                    onChangeText={(text) => {
                      const newExperience = [...experience];
                      newExperience[index].description = text;
                      setExperience(newExperience);
                    }}
                    placeholder="Describe your responsibilities and achievements"
                    multiline
                    numberOfLines={4}
                  />
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addExperience}>
              <Plus size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Experience</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeSection === 'skills' && (
          <View style={styles.section}>
            {skills.map((skill, index) => (
              <View key={skill.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Skill #{index + 1}</Text>
                  <TouchableOpacity
                    onPress={() => setSkills(skills.filter(s => s.id !== skill.id))}
                    style={styles.deleteButton}>
                    <Trash2 size={20} color="#ff3b30" />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Skill Name</Text>
                  <TextInput
                    style={styles.input}
                    value={skill.name}
                    onChangeText={(text) => {
                      const newSkills = [...skills];
                      newSkills[index].name = text;
                      setSkills(newSkills);
                    }}
                    placeholder="Enter skill name"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Proficiency Level</Text>
                  <View style={styles.levelButtons}>
                    {(['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const).map((level) => (
                      <TouchableOpacity
                        key={level}
                        style={[
                          styles.levelButton,
                          skill.level === level && styles.levelButtonActive,
                        ]}
                        onPress={() => {
                          const newSkills = [...skills];
                          newSkills[index].level = level;
                          setSkills(newSkills);
                        }}>
                        <Text
                          style={[
                            styles.levelButtonText,
                            skill.level === level && styles.levelButtonTextActive,
                          ]}>
                          {level}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addSkill}>
              <Plus size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Skill</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.downloadButton}>
          <Download size={20} color="#fff" />
          <Text style={styles.downloadButtonText}>Download Resume</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'web' ? 20 : 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  sectionTabs: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  sectionButtonActive: {
    backgroundColor: '#e8f2ff',
  },
  sectionButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666',
  },
  sectionButtonTextActive: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
  },
  deleteButton: {
    padding: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  levelButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  levelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  levelButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  levelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  levelButtonTextActive: {
    color: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
  },
  downloadButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
});