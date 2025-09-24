import React, { useState } from "react";
import "./Resources.css";
import Alert from "../Alert/Alert";

const articles = [
  {
    title: "🌱 Why Do We Need Therapy?",
    content: `Therapy isn't just about solving problems—it's about taking care of your mind, just like we take care of our body. It creates a safe, supportive space to explore feelings, understand ourselves better, and move forward in life with clarity and strength.

✨ Here's why therapy matters:

🧠 Mental Clarity – Helps you untangle overwhelming thoughts and gain better understanding of your emotions.

❤ Emotional Healing – Supports you in processing grief, trauma, or painful past experiences.

☀ Stress & Anxiety Relief – Teaches healthy coping strategies for handling daily pressures.

🤝 Safe & Confidential Space – A judgment-free zone where you can openly share your feelings.

💬 Better Relationships – Improves communication skills and helps resolve conflicts with family, friends, or partners.

🌱 Personal Growth – Encourages self-discovery, builds resilience, and strengthens self-confidence.

🔄 Breaking Negative Patterns – Helps you identify unhealthy habits and replace them with positive ones.

🕊 Ongoing Well-being – Therapy is not only for crisis—it's a regular check-in for your mental health.`
  },
  {
    title: "💞 How Therapy Can Strengthen Couples",
    content: `Relationships are one of the most important parts of our lives. They bring love, support, and happiness—but they can also bring challenges. Every couple, no matter how strong, goes through disagreements, miscommunication, or stressful times. That's where couples therapy can make a big difference.

Therapy is not just for couples in crisis. It's also a space to grow together, improve communication, and build a healthier connection. By working with a therapist, couples can better understand each other's needs, resolve conflicts more peacefully, and create a stronger foundation for their relationship.

🌱 Benefits of Couples Therapy

💬 Improved Communication  
❤ Deeper Understanding  
⚖ Healthier Conflict Resolution  
🕊 Rebuilding Trust  
🌟 Strengthening Emotional Intimacy  
🎯 Setting Future Goals Together`
  },
  {
    title: "💤 The Connection Between Sleep and Mental Health",
    content: `Sleep is more than just rest for the body—it's also fuel for the mind. When we sleep well, we wake up feeling refreshed, focused, and emotionally balanced. But when sleep is poor or irregular, it can take a toll on our mental health, affecting mood, concentration, and overall well-being.

🌙 How Poor Sleep Affects Mental Health

😔 Increased Risk of Depression & Anxiety – Lack of sleep can intensify negative emotions and make it harder to cope with stress.  
⚡ Low Energy & Focus – Without enough rest, the brain struggles to concentrate.  
🌧 Mood Swings – Sleep deprivation often causes irritability and emotional ups and downs.  
🛡 Weakened Coping Skills – When tired, it's harder to manage daily challenges.

🌟 Tips for Better Sleep  
⏰ Stick to a Routine  
📵 Limit Screen Time Before Bed  
💧 Stay Hydrated & Eat Balanced Meals  

✨ Final Thoughts: Sleep is not a luxury—it's a necessity for a healthy mind and body.`
  },
  {
    title: "❤ Dealing with Anxiety: Tips That Work",
    content: `Anxiety is something many of us experience—it's the body's natural response to stress. Feeling nervous before an exam, a big meeting, or an important life event is normal. But when anxiety becomes constant and overwhelming, it can affect daily life, relationships, and overall well-being.

🌱 Practical Tips to Manage Anxiety  

🧘 Practice Deep Breathing – Inhale 4s, hold 4s, exhale 4s.  
📖 Use Grounding Techniques – Focus on 5 things you see, 4 touch, 3 hear, 2 smell, 1 taste.  
✍ Journaling – Helps release racing thoughts.  
🚶 Stay Active – Exercise reduces stress hormones.  
☕ Limit Caffeine & Alcohol – Both can trigger anxiety.  

✨ Final Thoughts: Anxiety doesn’t have to control your life—small steps make a big difference.`
  },
  {
    title: "🧒 Mental Health for Students: Coping with Exams & Pressure",
    content: `For students, exams often bring sleepless nights, stress, and endless expectations. Too much stress can affect focus, confidence, and well-being. With the right strategies, students can manage exam pressure.

💡 Tips to Cope with Exam Stress  

📝 Plan Smartly – Break study material into small chunks.  
⏰ Take Regular Breaks – Short rests refresh focus.  
🧘 Relaxation – Breathing, meditation, or a short walk.  
💧 Stay Healthy – Hydrate, eat balanced meals, avoid too much junk food.  

✨ Final Thoughts: Exams don’t define your worth—preparation and self-care are key.`
  },
  {
    title: "🏢 Workplace Mental Health: Beating Burnout",
    content: `Workplaces today are fast-paced and demanding. Constant pressure without balance can lead to burnout—a state of physical, emotional, and mental exhaustion.

🌟 Tips to Beat Burnout

⏳ Set Boundaries – Learn to say no when necessary.
🧘 Take Breaks – Short pauses refresh the mind.
📅 Prioritize & Organize – Focus on important tasks first.
🚶 Stay Active – Walking or stretching reduces stress.
🤝 Seek Support – Talk to managers or colleagues about workload.

✨ Final Thoughts: Burnout isn’t weakness—it’s a signal to change and take care of yourself.`
  },
  {
    title: "🧘 The Power of Mindfulness in Daily Life",
    content: `Mindfulness is the practice of being fully present and engaged in the moment, without judgment. In our busy lives, it's easy to get lost in thoughts about the past or future, but mindfulness helps us stay grounded and aware.

🌱 Benefits of Mindfulness

🧠 Reduced Stress – Helps calm the mind and lower anxiety levels.
💖 Improved Focus – Enhances concentration and productivity.
😊 Better Emotional Health – Increases self-awareness and emotional regulation.
🌟 Enhanced Relationships – Promotes active listening and empathy.
🛌 Better Sleep – Encourages relaxation before bed.

🌟 Simple Mindfulness Practices

🧘‍♀️ Breathing Exercises – Take deep breaths and focus on your breath.
🚶 Mindful Walking – Pay attention to each step and your surroundings.
📝 Journaling – Write down your thoughts without judgment.
🍽 Mindful Eating – Savor each bite and notice the flavors.

✨ Final Thoughts: Mindfulness is a skill that grows with practice—start small and build from there.`
  },
  {
    title: "🌟 Building Resilience: Overcoming Life's Challenges",
    content: `Resilience is the ability to bounce back from adversity. Life throws curveballs—job loss, relationship issues, health problems—but building resilience helps us navigate these challenges with strength and grace.

🌱 How to Build Resilience

💪 Develop a Positive Mindset – Focus on what you can control and learn from setbacks.
🤝 Build Strong Support Networks – Surround yourself with encouraging people.
🧘 Practice Self-Care – Prioritize rest, nutrition, and activities you enjoy.
🎯 Set Realistic Goals – Break challenges into manageable steps.
📈 Learn from Experience – Reflect on past difficulties and what you've gained.

🌟 Tips for Tough Times

🗣 Talk It Out – Share your feelings with trusted friends or a therapist.
🚶 Stay Active – Exercise releases endorphins that boost mood.
📖 Read Inspirational Stories – Learn from others who have overcome similar challenges.
⏰ Take Breaks – Allow yourself time to recharge.

✨ Final Thoughts: Resilience isn't about avoiding pain—it's about growing through it.`
  },
  {
    title: "📱 Digital Detox: Protecting Your Mental Health from Screens",
    content: `In today's digital world, screens are everywhere—phones, computers, TVs. While technology connects us, excessive screen time can harm mental health, leading to anxiety, depression, and sleep issues.

🌙 Negative Effects of Too Much Screen Time

😔 Increased Anxiety – Constant notifications and social media comparisons.
🛌 Poor Sleep – Blue light disrupts sleep patterns.
⚡ Reduced Focus – Multitasking with screens lowers productivity.
🌧 Mood Changes – Excessive scrolling can lead to feelings of isolation.

🌟 Digital Detox Tips

⏰ Set Screen Limits – Use apps to track and limit daily usage.
📵 Create No-Screen Zones – Designate areas like the bedroom as screen-free.
🕒 Schedule Breaks – Take regular walks or read without devices.
🤝 Engage Offline – Spend time with friends and family in person.
📖 Replace Habits – Swap scrolling with hobbies like reading or exercising.

✨ Final Thoughts: A digital detox isn't about quitting technology—it's about balance for better mental health.`
  }
];

export default function ArticlesPage() {
  const [expanded, setExpanded] = useState({});
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ type: '', message: '' });

  const toggleExpand = (title) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubscribe = () => {
    if (email) {
      setAlert({ type: 'success', message: `Thank you for subscribing with email: ${email}` });
      setEmail("");
    } else {
      setAlert({ type: 'error', message: 'Please enter a valid email address.' });
    }
  };

  return (
    <div className="articles-container">
      <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: '', message: '' })} />
      <h1 className="page-title">Mental Health Resources</h1>
      <p className="page-subtitle">
        Expert insights, practical tips, and evidence-based strategies to support your mental health journey
      </p>

      {/* Featured Article */}
      {articles.some(a => a.featured) && (
        <div className="featured-article">
          <h2>{articles.find(a => a.featured).title}</h2>
          <p>{articles.find(a => a.featured).content}</p>
          <p><strong>By {articles.find(a => a.featured).author} | {articles.find(a => a.featured).time}</strong></p>
        </div>
      )}

      {/* Search Placeholder */}
      <input
        type="text"
        placeholder="Search articles, topics, or authors..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Articles Grid */}
      <div className="articles-grid">
        {filteredArticles.map((article) => {
          const isExpanded = expanded[article.title];
          const shortContent = article.content.slice(0, 200) + (article.content.length > 200 ? "..." : "");
          return (
            <div className="article-card" key={article.title}>
              <h3 className="article-title">{article.title}</h3>
              <p className="article-meta">{article.category} | {article.time} | {article.author}</p>
              <p className="article-content">{isExpanded ? article.content : shortContent}</p>
              {article.content.length > 200 && (
                <button className="toggle-btn" onClick={() => toggleExpand(article.title)}>
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Subscribe Section */}
      <div className="subscribe-section">
        <h3>Stay Updated</h3>
        <p>Get the latest mental health resources, tips, and insights delivered to your inbox</p>
        <input
          type="email"
          placeholder="Enter your email"
          className="subscribe-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="subscribe-btn" onClick={handleSubscribe}>Subscribe</button>
      </div>
    </div>
  );
}
