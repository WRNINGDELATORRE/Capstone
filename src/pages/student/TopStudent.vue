<template>
  <q-page class="q-pa-md bg-grey-2">
    <!-- School logo and name centered horizontally -->
    <div class="school-header q-mb-xl">
      <q-img src="src/assets/CPC.png" class="school-logo" />
      <h1 class="school-name text-h3 text-weight-bold q-my-none text-primary">Top 10 Honest Students</h1>
    </div>

    <!-- Title and Description -->
    <div class="text-center q-mb-xl">
      <p class="text-subtitle1 text-grey-8">
        Recognizing our students who demonstrate integrity and responsibility by reporting lost and found items.
      </p>
    </div>

    <!-- Conditional rendering based on passing students -->
    <div v-if="passingStudents.length >= 10" class="student-rows">
      <div v-for="(row, rowIndex) in [passingStudents.slice(0, 5), passingStudents.slice(5, 10)]" :key="rowIndex" class="student-row">
        <div v-for="(student, index) in row" :key="student.id" class="student-card-wrapper">
          <!-- Student card content (same as before) -->
          <q-card class="student-card">
            <q-card-section class="text-center">
              <q-avatar size="120px" class="shadow-5">
                <img :src="student.profilePicture" :alt="student.name" />
              </q-avatar>
              <div class="rank-badge">{{ rowIndex * 5 + index + 1 }}</div>
            </q-card-section>

            <q-card-section>
              <div class="text-h6 ellipsis text-weight-bold">{{ student.name }}</div>
              <div class="text-subtitle2 text-grey">{{ student.department }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-linear-progress
                :value="student.score / 100"
                color="primary"
                class="q-mb-sm"
                size="10px"
              />
              <div class="row justify-between items-center">
                <div class="text-caption text-grey-7">Score</div>
                <div class="text-h6 text-primary text-weight-bold">{{ student.score }}</div>
              </div>
            </q-card-section>

            <q-card-section v-if="student.description" class="q-pt-none">
              <q-separator class="q-my-sm" />
              <div class="text-caption text-grey-8 text-italic">
                "{{ student.description }}"
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <h2 class="text-h4 text-weight-medium q-mb-md">Stay Tuned!</h2>
      <p class="text-h6 text-grey-8">
        We're waiting for more students to achieve passing scores. 
        Check back soon to see our top 10 honest students!
      </p>
      <p class="text-subtitle1 q-mt-lg">
        Current number of passing students: {{ passingStudents.length }}
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      students: [
        {
          id: 1,
          name: "Arong, Alejandro Jr",
          department: "BSIT",
          score: 98,
          profilePicture: "src/assets/images/Arong.png",
          description: "Passionate about technology and helping others."
        },
        {
          id: 2,
          name: "Cuyos, Janmarie",
          department: "BSIT",
          score: 95,
          profilePicture: "src/assets/images/cuyos.png",
          description: "Dedicated to community service and excellence."
        },
        {
          id: 3,
          name: "Pahugot, Shena Norren",
          department: "BSIT",
          score: 89,
          profilePicture: "src/assets/images/pahugot.jpg",
          description: "Dedicated to community service and excellence."
        },
        {
          id: 4,
          name: "Jane Smith",
          department: "Business",
          score: 70,
          profilePicture: "src/assets/images/qq.jpg",
          description: "Dedicated to community service and excellence."
        },
        {
          id: 5,
          name: "Jane Smith",
          department: "Business",
          score: 45,
          profilePicture: "src/assets/CPC.png",
          description: "Dedicated to community service and excellence."
        },
        {
          id: 5,
          name: "Jane Smith",
          department: "Business",
          score: 78,
          profilePicture: "src/assets/CPC.png",
          description: "Dedicated to community service and excellence."
        },
        {
          id: 5,
          name: "Jane Smith",
          department: "Business",
          score: 99,
          profilePicture: "src/assets/CPC.png",
          description: "Dedicated to community service and excellence."
        },
        {
          id: 5,
          name: "Jane Smith",
          department: "Business",
          score: 78,
          profilePicture: "src/assets/CPC.png",
          description: "Dedicated to community service and excellence."
        },
        {
          id: 5,
          name: "Jane Smith",
          department: "Business",
          score: 88,
          profilePicture: "src/assets/CPC.png",
          description: "Dedicated to community service and excellence."
        },
        {
          id: 5,
          name: "Jane Smith",
          department: "Business",
          score: 81,
          profilePicture: "src/assets/CPC.png",
          description: "Dedicated to community service and excellence."
        },
        {
          id: 5,
          name: "Jane Smith",
          department: "Business",
          score: 78,
          profilePicture: "src/assets/CPC.png",
          description: "Dedicated to community service and excellence."
        }
        // more students...
      ]
    };
  },
  computed: {
    passingStudents() {
      return this.students
        .filter(student => student.score >= 50)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    }
  }
};

</script>

<style lang="scss" scoped>
.school-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.school-logo {
  width: 100px;
  height: 100px;
}

.student-rows {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.student-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.student-card-wrapper {
  flex: 1;
  min-width: 0; // This is important for proper flexbox behavior
}

.student-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .q-card__section {
    flex: 1 0 auto;
  }

  .rank-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: green;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1rem;
  }
}

@media (max-width: 1023px) {
  .student-row {
    flex-wrap: wrap;
  }

  .student-card-wrapper {
    flex-basis: calc(50% - 0.5rem);
  }
}

@media (max-width: 599px) {
  .school-name {
    font-size: 2rem;
  }

  .student-card-wrapper {
    flex-basis: 100%;
  }
}
</style>