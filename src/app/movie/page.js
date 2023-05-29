import Link from "next/link"
import MovieCard from "../components/MovieCard";
import styles from "@/app/styles/common.module.css";

const Movie = async ({ searchParams }) => {
  // await new Promise(resolve => setTimeout(resolve, 2000));

  // const url = process.env.RAPID_KEY;

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "eee6b32116mshd00466becebb1e4p19243djsn744d45c7fb8c",
  //     "X-RapidAPI-Host": "netflix54.p.rapidapi.com",
  //   },
  // };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST,
    },
  }

  const totalData = 177;
  const dataPerPage = 8;
  const totalPages = Math.ceil(totalData / dataPerPage);

  let currentPage = 1;

  if (Number(searchParams.page) >= 1) {
    currentPage = Number(searchParams.page);
  }

  let offset = (currentPage - 1) * dataPerPage;
  const res = await fetch(
    `https://netflix54.p.rapidapi.com/search/?query=stranger&offset=${offset}&limit_titles=${dataPerPage}&limit_suggestions=20&lang=en`, options
  );

  const data = await res.json();
  const main_data = data.titles;

  let pageNumbers = [];

  for (let i = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPages) break;
    
    pageNumbers.push(i);
  }


  return (
    <>
      <section className={styles.movieSection}>
        <div className={styles.container}>
          <h1>Series & Movies</h1>
          <div className={styles.card_section}>
            {main_data.map((curElem) => {
              return <MovieCard key={curElem.id} {...curElem} />;
            })}
          </div>
        </div>
        <div className={styles.container} style={{ display: "flex", gap: "2rem", justifyContent: "center"}}>
          {currentPage - 1 >= 1 && (
            <>
              <Link href="/movie">{"<<"}</Link>
            </>
          )}
          {pageNumbers.length > 0 &&
            pageNumbers.map((page) => (
              <Link key={page} href={`/movie?page=${page}`} className={page === currentPage ? styles.activeLink : ""}>
                {page}
              </Link>
            ))}
          {currentPage + 1 <= totalPages && (
            <>
              <Link href="/movie">{">>"}</Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}
export default Movie