import React from 'react'
import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {

  //For API requests
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  //For articles history
  const [allArticles, setAllArticles] = useState([]);

  // For copying url to clipboard
  const [copied, setCopied] = useState('');

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  //For storing in local storage
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  //For submit button logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  // For copy to clipboard functionality
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <section className='mt-16 w-full max-w-xl'>

      {/* SEARCH */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit} // the click event for SEARCH btn
        >
          {/* THE SEARCH FEILD AREA ITSELF */}
          <div className='relative'>
            <input
              type='url'
              placeholder='Enter a URL'
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              required
              className='url_input peer pl-8 w-full'
            />
            {/* SMALL LINK ICON INSIDE THE INPUT */}
            <img
              src={linkIcon}
              alt='link_icon'
              className='absolute left-2 top-1/2 transform -translate-y-1/2 w-5 pointer-events-none'
            />
            {/* TO EXCECUTE THE LINK */}
            <button
              type='submit'
              className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
            >
              {/* GOT FROM INTERNET */}
              ↲
            </button>
          </div>
        </form>

        {/* BROWSE THE URL HISTORY */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              {/* CLIPBOARD */}
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={ copied === item.url ? tick : copy }
                  alt='copy_icon'
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-600 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* DISPLAY THE HISTORY RESULTS */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt="loading..." className='w-20 h-20 object-contain items-center' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Sorry, it appears to have some problems right now...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>

    </section>
  )
}


export default Demo