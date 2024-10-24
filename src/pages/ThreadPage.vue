<template>
    <q-page class="q-pa-md">
      <div class="forum-container">
        <div class="thread-header q-mb-md">
          <h2>{{ thread.title }}</h2>
          <p>Posted by {{ thread.author }} on {{ thread.datePosted }}</p>
        </div>
  
        <q-card class="q-mb-md">
          <q-card-section>{{ thread.content }}</q-card-section>
          <q-separator />
          <q-card-section>
            <q-btn label="Reply" color="primary" @click="replyToThread" />
          </q-card-section>
        </q-card>
  
        <div class="replies">
          <q-list>
            <q-item-label header>Replies</q-item-label>
            <q-item v-for="reply in thread.replies" :key="reply.id">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="reply.avatar" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ reply.user }}</q-item-label>
                <q-item-label caption>{{ reply.date }}</q-item-label>
                <q-item-label>{{ reply.message }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
  
        <q-card class="reply-box q-mt-md">
          <q-card-section>
            <q-input v-model="newReply" label="Your Reply" type="textarea" />
            <q-btn label="Post Reply" color="primary" class="q-mt-md" @click="postReply" />
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        thread: {
          title: 'How to use the forum',
          author: 'Admin',
          datePosted: '2024-09-01',
          content: 'Last week, I left my laptop in the library by accident. I didn’t realize it was missing until hours later, and I was panicking because all my notes and assignments were on it. Thankfully, a fellow student found it and posted it on the Lost and Found app. They included a photo and a description, and when I checked the reports section, I saw my laptop!',
          replies: [
            { id: 1, user: 'User123', avatar: 'avatar1.jpg', date: '2024-09-02', message: 'Thank you, Admin!' },
            { id: 2, user: 'User456', avatar: 'avatar2.jpg', date: '2024-09-03', message: 'How do I post a new thread?' },
          ]
        },
        newReply: ''
      };
    },
    methods: {
      replyToThread() {
        // Scroll to reply box or trigger the reply action
      },
      postReply() {
        if (this.newReply.trim()) {
          this.thread.replies.push({
            id: Date.now(),
            user: 'You',
            avatar: 'your-avatar.jpg',
            date: new Date().toLocaleDateString(),
            message: this.newReply
          });
          this.newReply = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .forum-container {
    max-width: 900px;
    margin: 0 auto;
  }
  </style>
  