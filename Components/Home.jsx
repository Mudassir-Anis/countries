import "../App.css";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import CountriesContainer from "./CountriesContainer";
import { useState } from "react";
import  useTheme  from "../hooks/useTheme";

export default function Home() {
  const [query, setQuery] = useState("");
 

  const [isDark] = useTheme();
  return (
    <main className={isDark ? "dark" : ""}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery} />
      </div>
      <CountriesContainer query={query} />
    </main>
  );
}

// import React, { useState } from "react";
// import SearchBar from "./SearchBar";
// import SelectMenu from "./SelectMenu";
// import CountriesContainer from "./CountriesContainer";

// export default function Home() {
//   const [query, setQuery] = useState("");
//   const [query1, setQuery1] = useState("");
//   return (
//     <main>
//       <div className="search-filter-container">
//         <SearchBar setQuery={setQuery} />
//         <SelectMenu setQuery={setQuery1} />
//       </div>
//       {query == "unmount" ? (
//         ""
//       ) : (
//         <CountriesContainer query={query} query1={query1} />
//       )}
//     </main>
//   );
// }
