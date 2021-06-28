import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Companies === */

  /** Get company list */
  static async getCompanyList () {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Get company details by searching */
  static async getCompanyBySearching(name) {
    let res = await this.request(`companies`, {name});
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Users === */

  /** Sign up and return token */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get token for login from username, password */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Get current user */
  static async getCurrentUser(userName) {
    let res = await this.request(`users/${userName}`);
    return res.user;
  }

  /** update user's profile */
  static async saveProfile(userName, data) {
    let res = await this.request(`users/${userName}`, data, "patch");
    return res.user;
  }

  /** Apply a job with userName */
  static async applyJob(userName, jobId) {
    await this.request(`users/${userName}/jobs/${jobId}`, {}, "post");
  }

  /** Jobs === */
  /** Get all th jobs */
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /** Get jobs by searching */
  static async getJobsBySearching(title) {
    let res = await this.request(`jobs`, {title});
    return res.jobs;
  }

  /** Get job list */
  static async getJobList () {
    let res = await this.request(`jobs`);
    return res.jobs;    
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;