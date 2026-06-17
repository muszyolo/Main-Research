/**
 * Creates the CSI-PASD Autism Caregiver Questionnaire in Google Forms.
 * Instructions:
 * 1. Go to https://script.google.com/ and create a new project.
 * 2. Delete the default code and paste all of this code into the editor.
 * 3. Click "Run" (the play button) at the top.
 * 4. Review and accept the permissions when prompted.
 * 5. Check your Google Drive for the newly created form!
 */

function createCSIPASDForm() {
  // 1. Create the Form
  var form = FormApp.create('Bilingual Autism Caregiver Support Instrument (CSI-PASD)');
  
  var descriptionText = 'Thank you for your invaluable participation in this research study. This instrument (CSI-PASD) was specifically developed to understand the multidimensional experiences and support-seeking intentions of caregivers raising children with Autism Spectrum Disorder (ASD) in Malaysia.\n\n' +
    'This questionnaire is divided into four main sections:\n' +
    '• Section 1: Screening & Consent – Verifies your eligibility as a primary caregiver in Malaysia and secures your informed consent.\n' +
    '• Section 2: Demographics (Part A) – Focuses on your background information (e.g., location, income level, and child’s diagnosis level) to help us contextualize the data for cluster analysis.\n' +
    '• Section 3: Psychological Scales (Part B) – Utilizes a validated 5-point Likert scale to measure your attitudes, perceived social support, logistical barriers, and intentions regarding professional counseling.\n' +
    '• Section 4: Qualitative Feedback – Provides an open-ended section for you to share specific personal experiences regarding current support systems.\n\n' +
    'Confidentiality & Ethical Procedures:\n' +
    'As per standard professional research protocols, all data collected in this study will remain strictly confidential and will be utilized exclusively for academic and clinical profiling purposes. Your honest responses will directly contribute to developing targeted, profile-informed counseling frameworks for the autism community.';
  
  form.setDescription(descriptionText);
  form.setProgressBar(true);
  
  // ==========================================
  // SECTION 1: Screening & Consent
  // ==========================================
  form.addSectionHeaderItem()
      .setTitle('Section 1: Screening & Consent / Saringan & Keizinan');
  
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Q1. Are you a primary caregiver (parent/guardian) of an individual diagnosed with Autism Spectrum Disorder (ASD)?\nAdakah anda penjaga utama kepada individu yang didiagnosis dengan ASD?')
    .setChoices([
      q1.createChoice('Yes / Ya'),
      q1.createChoice('No / Tidak')
    ])
    .setRequired(true);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Q2. Are you currently residing in Malaysia?\nAdakah anda sedang menetap di Malaysia?')
    .setChoices([
      q2.createChoice('Yes / Ya'),
      q2.createChoice('No / Tidak')
    ])
    .setRequired(true);
    
  // ==========================================
  // SECTION 2: Demographics (Part A)
  // ==========================================
  form.addPageBreakItem().setTitle('Section 2: Demographics (Part A) / Demografi');
  
  form.addTextItem()
      .setTitle('State of Residence / Negeri Menetap:')
      .setRequired(true);
      
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Monthly Household Income / Pendapatan Bulanan Isi Rumah (MYR):')
    .setChoices([
      q4.createChoice('B40: Below RM5,250'),
      q4.createChoice('M40: RM5,251 - RM11,819'),
      q4.createChoice('T20: Above RM11,820')
    ])
    .setRequired(true);
    
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Child\'s Severity Level / Tahap Keparahan Anak:')
    .setChoices([
      q5.createChoice('Level 1 (Mild / Ringan)'),
      q5.createChoice('Level 2 (Moderate / Sederhana)'),
      q5.createChoice('Level 3 (Severe / Teruk)')
    ])
    .setRequired(true);

  // ==========================================
  // SECTION 3: Psychological Scales (Part B)
  // ==========================================
  form.addPageBreakItem()
      .setTitle('Section 3: Psychological Scales (Part B)')
      .setHelpText('*1 strongly disagree, 2 disagree, 3 neutral, 4 agree, 5 strongly agree*');
  
  var columns = ['1', '2', '3', '4', '5'];

  // Domain A: Attitude
  var gridAtt = form.addGridItem();
  gridAtt.setTitle('Attitude toward the Behavior (ATT)')
         .setRows([
           'Seeking counseling for myself when I feel overwhelmed would be beneficial.',
           'Getting counseling support for myself would improve my emotional well-being.',
           'For me, seeking counseling when I feel burned out is a good idea.',
           'Seeking counseling for myself would be helpful.',
           'Receiving counseling support for myself would be worthwhile.',
           'Overall, seeking counseling for myself when I feel emotionally exhausted would be positive.'
         ])
         .setColumns(columns)
         .setRequired(true);

  // Domain B: Subjective Norm
  var gridSn = form.addGridItem();
  gridSn.setTitle('Subjective Norm (SN)')
        .setRows([
          'People who are important to me think I should seek counseling when I feel emotionally overwhelmed.',
          'My close family members would support me if I sought counseling.',
          'People whose opinions I value would encourage me to seek counseling if I felt burned out.',
          'Most people important to me would approve of me seeking counseling.',
          'People around me believe seeking counseling for emotional stress is acceptable.'
        ])
        .setColumns(columns)
        .setRequired(true);

  // Domain C: Perceived Behavioral Control
  var gridPbc = form.addGridItem();
  gridPbc.setTitle('Perceived Behavioral Control (PBC)')
         .setRows([
           'I feel confident that I could seek counseling if I needed emotional support.',
           'Whether I seek counseling when I feel burned out is mostly under my control.',
           'I would be able to find counseling services if I needed them.',
           'I have the ability to arrange counseling for myself.',
           'Even if I feel overwhelmed, I believe I could still seek counseling.',
           'It would be easy for me to seek counseling if I decided to do so.'
         ])
         .setColumns(columns)
         .setRequired(true);

  // Domain D: Behavioral Intention
  var gridBi = form.addGridItem();
  gridBi.setTitle('Behavioral Intention (BI)')
        .setRows([
          'I intend to seek counseling if I feel emotionally overwhelmed.',
          'I plan to seek counseling if I experience burnout.',
          'I will make an effort to seek counseling when I feel emotionally exhausted.',
          'I am willing to seek counseling if I need emotional support.',
          'I am likely to seek counseling if I feel unable to cope with stress.'
        ])
        .setColumns(columns)
        .setRequired(true);

  // Domain E: Help-Seeking Behavior
  var gridB = form.addGridItem();
  gridB.setTitle('Help-Seeking Behavior (B)')
       .setRows([
         'In the past three months, I have considered seeking counseling for emotional support.',
         'In the past three months, I have searched for counseling services.',
         'I have contacted or scheduled a counseling session when feeling emotionally overwhelmed.',
         'I have sought professional counseling to manage stress or burnout.',
         'I actively seek professional support when I experience emotional difficulties.'
       ])
       .setColumns(columns)
       .setRequired(true);

  // ==========================================
  // SECTION 4: Caregiver Narrative & Lived Experience (NLP Source)
  // ==========================================
  form.addPageBreakItem()
      .setTitle('Section 4: Caregiver Narrative & Lived Experience / Pengalaman Peribadi Penjaga')
      .setHelpText('In this final section, we want to hear your personal story. Understanding your emotional journey—both the systemic struggles and your moments of strength—is crucial for us to design truly targeted, human-led support systems in Malaysia.');
  
  var q6 = form.addParagraphTextItem();
  q6.setTitle('Q6. Reflecting on your journey, describe a specific moment when you felt overwhelmed by the caregiving process or when the support systems in Malaysia failed to meet your family\'s needs. How did this impact your emotional well-being?\n' +
              'Gambarkan detik tertentu apabila anda berasa terbeban dengan proses penjagaan atau apabila sistem sokongan di Malaysia gagal memenuhi keperluan keluarga anda. Apakah kesannya terhadap emosi anda?')
    .setHelpText('Please share as much detail as you are comfortable with. Your narrative helps us identify critical gaps in the system. (Sila kongsi dengan terperinci.)')
    .setRequired(false);

  var q7 = form.addParagraphTextItem();
  q7.setTitle('Q7. Despite these challenges, describe a moment of breakthrough, resilience, or a specific coping strategy (e.g., spiritual support, community help) that allowed you to regain control. Where do you draw your strength from?\n' +
              'Di sebalik cabaran tersebut, gambarkan detik ketabahan atau strategi daya tindak (coping) yang membantu anda. Dari manakah anda mendapat kekuatan untuk meneruskan sokongan?')
    .setHelpText('This helps us map the "vocabulary of resilience" to better empower other parents in the future. (Ini membantu kami memahami bagaimana penjaga membina daya ketabahan.)')
    .setRequired(false);

  Logger.log('Form created successfully! Form URL: ' + form.getEditUrl());
}
