<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Welcome
      </h1>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10"></div>
      <div class="flex flex-col col-span-2">
        <div class="ml-10">
          <h2 class="text-2xl font-bold m-2" style="text-align: center;">Event Attendance For Prior Two Months</h2>
          <AttendanceChart v-if="!loading && !error" :label="labels" :chart-data="attendance"></AttendanceChart>
        </div>
      </div>
    </div>
    <!-- Display Found Data -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 m-3">
      <div class="ml-10"></div>
      <div class="flex flex-col col-span-2">
        <div class="ml-10">
          <h2 class="text-2xl font-bold m-2" style="text-align: center;">Events Table (Data Displayed In Chart)</h2>
        </div>
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Event Name</th>
              <th class="p-4 text-left">Attendance</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr v-for="event in queryData" :key="event._id">
              <td class="p-2 text-left">{{ event._id }}</td>
              <td class="p-2 text-left">{{ event.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
import { DateTime } from "luxon";
import axios from "axios";
import AttendanceChart from "/src/components/chart.vue";

export default {
  components: {
    AttendanceChart,
  },
  data() {
    return {
      queryData: [],
      labels: [],
      attendance: [],
      loading: false,
      error: null,
    };
  },

  //Enhanced Error Handling
  methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = import.meta.env.VITE_ROOT_API + `/eventsData/previousAttendees/`;
        const response = await axios.get(url);
        this.labels = response.data.map((event) => event._id);
        this.attendance = response.data.map((event) => event.total);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
    formattedDate(datetimeDB) {
      return DateTime.fromISO(datetimeDB).plus({ days: 1 }).toLocaleString();
    },
  },

  mounted() {
    this.fetchData();
    let apiURL = import.meta.env.VITE_ROOT_API + `/eventsData/previousAttendees/`;
    this.queryData = [];
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
    });
    window.scrollTo(0, 0);
  },
};
</script>
