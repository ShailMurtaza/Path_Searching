class Search {
    constructor(map) {
        this.map = map // Map object
        this.algo = null // Object of searching algorithm
    }
    // start the search
    start() {
        // If this.algo isn't null and interval isn't null then search is already running
        if (this.algo && this.algo.interval != null) {
            show_msg("Search already running")
        }
        // Else if start and goal then start search
        else if (this.map.start && this.map.goal) {
            canvas.scrollIntoView()
            this.algo = new algo[algo_select.value](this.map) // Create new object of searching algorithm and pass map
            this.algo.start_search()
            update_status("RUNNING ...")
        }
        else {
            show_msg("START or GOAL node not selected")
        }
    }
    // stop the search
    stop() {
        // If this.algo exists and interval isn't null then cancel search by clearInterval
        if (this.algo && this.algo.interval != null) {
            clearInterval(this.algo.interval)
            this.algo.interval = null
            show_msg("Search Stopped")
            update_status("STOPPED ...")
        }
        else {
            show_msg("Nothing to stop")
        }
    }
}

const algo = {
    0: DFS,
    1: BFS,
    2: Bi_directional,
    3: BestFS,
    4: A_star,
}
const search = new Search(map)

