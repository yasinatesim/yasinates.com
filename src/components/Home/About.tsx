import React from 'react'

const About = () => {
	return (
		<section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hakkımda</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Frontend geliştirici olarak deneyimlerim ve müzik tutkumla birlikte profesyonel yolculuğum.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-2/5">
              <div className="rounded-lg  shadow-lg relative after:rounded-lg after:absolute after:w-full after:h-full after:bg-stone-800 after:top-1 after:left-1 after:z-0">
                <img src="/366954855_635793308531598_5149023022025183389_n.jpg" alt="Yasin Ateş Hakkında" className="w-full h-auto object-cover z-10 relative rounded-lg" />
              </div>
            </div>
            <div className="w-full md:w-3/5">
              <p className="text-lg text-gray-700 mb-6">
                2012 yılında başlayan yazılımcılık hikayeme, 2015 yılından beri Frontend Developer olarak devam ediyorum. Genellikle frontend ağırlıklı olmak üzere, yazılımla ilgili güncel teknolojileri takip etmeye çalışıyorum.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Medium'da paylaşmış olduğum Türkçe içerikleri, İngilizce olarak dev.to'da paylaşıyorum. Beni daha yakından tanımak ve hesaplarımı takip etmek için aşağıdaki bağlantıları takip edebilirsiniz.
              </p>
              <h3 className="text-xl font-semibold mb-4">Teknolojiler</h3>
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center border border-orange-500 text-orange-500 bg-orange-100 rounded-lg mb-2">
                    <i className="ri-html5-fill ri-2x"></i>
                  </div>
                  <span className="text-sm text-gray-700">HTML5</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center border border-blue-500 text-blue-500 bg-blue-100 rounded-lg mb-2">
                    <i className="ri-css3-fill ri-2x"></i>
                  </div>
                  <span className="text-sm text-gray-700">CSS3</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center border border-pink-500 text-pink-500 bg-pink-100 rounded-lg mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={40}
                      height={40}
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="M31.641 21.161c-.109-.911-.578-1.618-1.286-2.172-.82-.641-1.78-.905-2.803-.947a6.327 6.327 0 0 0-2.437.376c-.224.081-.444.177-.67.268-.03-.055-.062-.107-.088-.162-.232-.474-.512-.927-.573-1.47-.044-.386-.098-.772-.006-1.153.088-.367.204-.728.312-1.091.056-.187.017-.291-.161-.375a.724.724 0 0 0-.197-.065 3.04 3.04 0 0 0-1.293.096c-.15.044-.259.128-.292.294-.019.095-.058.186-.084.28-.111.391-.189.789-.368 1.161-.449.934-.96 1.832-1.485 2.724-.057.096-.116.191-.188.308-.184-.385-.38-.73-.44-1.136-.067-.458-.12-.915-.006-1.37.085-.339.196-.672.298-1.006.049-.159.026-.242-.118-.326a.696.696 0 0 0-.237-.092 2.904 2.904 0 0 0-1.338.11c-.136.044-.207.132-.249.272-.122.413-.226.836-.397 1.229a429.556 429.556 0 0 1-2.12 4.753c-.149.33-.323.649-.491.97-.043.082-.104.153-.157.23-.043-.05-.059-.085-.059-.119.001-.203-.023-.413.016-.609.117-.594.252-1.186.395-1.775.117-.486.254-.968.385-1.452.044-.162.045-.313-.072-.449-.195-.228-.603-.278-.845-.102-.026.019-.057.032-.107.061.009-.077.014-.125.021-.173.051-.37.061-.738-.04-1.103-.127-.454-.45-.715-.921-.701a1.98 1.98 0 0 0-.653.124c-.855.335-1.512.928-2.071 1.642a.64.64 0 0 1-.189.163c-.723.401-1.449.797-2.174 1.195l-.807.442c-.216-.207-.413-.421-.637-.603-.682-.556-1.375-1.098-2.061-1.648-.608-.487-1.198-.995-1.649-1.64-.336-.48-.552-1.005-.572-1.599-.026-.756.188-1.447.573-2.091.493-.823 1.164-1.483 1.903-2.082.781-.633 1.626-1.17 2.502-1.66 1.225-.686 2.486-1.293 3.837-1.694 1.386-.411 2.791-.646 4.241-.482.57.064 1.123.195 1.632.474.389.213.708.492.857.929.146.43.142.865.04 1.301-.206.883-.69 1.612-1.299 2.263-.998 1.067-2.216 1.793-3.588 2.273a9.843 9.843 0 0 1-2.441.521c-.682.057-1.35-.003-1.996-.241a2.597 2.597 0 0 1-1.1-.747c-.054-.063-.122-.13-.222-.072-.098.057-.115.151-.082.245.055.157.105.319.191.459.214.351.527.606.871.825.661.42 1.399.561 2.165.594 1.162.05 2.296-.123 3.413-.435 1.596-.445 2.983-1.231 4.096-2.471.927-1.032 1.588-2.198 1.73-3.605.069-.687-.004-1.36-.326-1.986-.349-.679-.903-1.147-1.566-1.494-.964-.506-2.006-.705-3.081-.763H14a12.844 12.844 0 0 0-3.786.782c-.926.337-1.835.717-2.717 1.157-1.921.96-3.71 2.108-5.179 3.699-.732.793-1.352 1.663-1.708 2.693-.104.302-.168.622-.243.934-.006.026.023.051-.041.077v.44c.064.113.071.225.1.338.189.733.578 1.363 1.06 1.937.687.818 1.518 1.476 2.38 2.096.747.537 1.505 1.062 2.255 1.595.129.091.248.197.388.309-.12.065-.221.122-.325.175-.99.502-1.942 1.065-2.82 1.747-.529.411-1.041.848-1.402 1.418-.581.918-.787 1.896-.354 2.94.127.305.32.569.592.763a.863.863 0 0 0 .29.15c.264.062.534.103.802.152h.758a4.714 4.714 0 0 0 2.291-.838c1.078-.744 1.804-1.741 2.117-3.022.227-.93.236-1.862-.031-2.788-.025-.086-.056-.17-.089-.253s-.071-.164-.116-.268l1.719-.989.026.022c-.031.102-.064.204-.093.308-.204.746-.34 1.505-.291 2.279.052.825.282 1.597.765 2.287.39.558 1.321.578 1.736.019a4 4 0 0 0 .397-.628c.28-.579.54-1.168.807-1.753l.047-.107c-.019.277-.042.52-.052.764-.016.38.006.758.136 1.12.111.31.3.541.655.581.242.028.436-.083.614-.224.279-.22.505-.491.673-.8.475-.873.963-1.74 1.394-2.635.466-.968.873-1.964 1.306-2.948.024-.054.045-.109.072-.175.102.402.174.795.305 1.168.152.432.341.854.547 1.264.097.194.086.32-.049.482-.564.68-1.118 1.368-1.673 2.056a4.542 4.542 0 0 0-.347.472.915.915 0 0 0-.12.341.434.434 0 0 0 .346.493c.219.047.453.065.677.048a3.972 3.972 0 0 0 2.099-.789c.805-.597 1.064-1.41.869-2.375-.053-.262-.146-.517-.237-.769-.041-.114-.043-.194.031-.3.644-.919 1.194-1.895 1.705-2.892a.613.613 0 0 1 .076-.121c.166.863.415 1.694.862 2.448-.228.22-.454.419-.658.639-.45.483-.84 1.009-1.043 1.649-.087.276-.155.556-.116.852.061.458.436.755.886.651.963-.223 1.795-.677 2.403-1.481.409-.541.446-1.145.275-1.778-.047-.172-.103-.341-.163-.539.238-.074.47-.162.709-.217 1.245-.284 2.476-.234 3.675.215.7.262 1.266.702 1.601 1.393.41.845.183 1.646-.613 2.18-.074.05-.159.089-.221.151a.216.216 0 0 0-.051.167c.005.031.087.069.133.069.262-.002.474-.139.678-.28.511-.353.848-.829.928-1.454.002-.018-.024-.035.04-.052v-.416c-.064-.017-.037-.034-.039-.052zm-24.355 1.69c-.083 1.115-.588 2.019-1.414 2.75-.465.412-.997.705-1.618.808-.225.037-.455.046-.674-.047-.311-.133-.381-.409-.387-.704-.009-.469.155-.893.38-1.296.294-.526.725-.927 1.185-1.301.725-.59 1.512-1.09 2.317-1.561.013-.008.029-.012.061-.025.124.46.184.914.149 1.377zm6.29-4.845a8.45 8.45 0 0 1-.236 1.057c-.36 1.194-.821 2.352-1.32 3.493-.092.211-.226.404-.343.604-.018.031-.045.058-.071.084-.144.143-.282.135-.355-.052a3.93 3.93 0 0 1-.182-.679c-.03-.154-.023-.316-.032-.474.01-1.123.352-2.145.934-3.095.24-.392.501-.765.899-1.014a1.62 1.62 0 0 1 .399-.177c.212-.06.343.039.308.252zm4.291 5.467 1.542-1.801c.064.669-1.072 2.004-1.542 1.801zm4.926-1.211c-.109.062-.228.108-.34.165-.102.053-.136 0-.139-.088a.61.61 0 0 1 .023-.18 3.866 3.866 0 0 1 1.162-1.871c.008-.008.021-.011.04-.021a1.651 1.651 0 0 1-.747 1.995z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">SASS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center border border-yellow-500 text-yellow-500 bg-yellow-100 rounded-lg mb-2">
                    <i className="ri-javascript-fill ri-2x"></i>
                  </div>
                  <span className="text-sm text-gray-700">JavaScript</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center border border-yellow-600 text-yellow-600 bg-yellow-100 rounded-lg mb-2">
                    <i className="ri-javascript-fill ri-2x"></i>
                  </div>
                  <span className="text-sm text-gray-700">ES6</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center border border-blue-400 text-blue-400 bg-blue-100 rounded-lg mb-2">
                    <i className="ri-reactjs-fill ri-2x"></i>
                  </div>
                  <span className="text-sm text-gray-700">React</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center border border-purple-500 text-purple-500 bg-purple-100 rounded-lg mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={35}
                      height={35}
                      preserveAspectRatio="xMidYMid"
                      viewBox="0 -6 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="M177.381 169.733c9.447-.978 16.614-9.122 16.288-18.896-.325-9.773-8.47-17.592-18.243-17.592h-.651c-10.1.326-17.918 8.796-17.592 18.895.326 4.887 2.28 9.122 5.212 12.054-11.076 21.828-28.016 37.791-53.426 51.148-17.266 9.122-35.183 12.38-53.1 10.1-14.66-1.955-26.062-8.47-33.23-19.222-10.424-15.963-11.401-33.23-2.605-50.496 6.19-12.38 15.962-21.502 22.152-26.063-1.303-4.235-3.258-11.402-4.235-16.614-47.237 34.207-42.35 80.468-28.016 102.295 10.75 16.29 32.577 26.389 56.684 26.389 6.515 0 13.03-.652 19.546-2.28 41.699-8.145 73.299-32.905 91.216-69.718zm57.336-40.397c-24.759-28.995-61.245-44.958-102.944-44.958h-5.212c-2.932-5.864-9.122-9.774-15.963-9.774h-.652C99.848 74.93 92.03 83.4 92.355 93.5c.326 9.773 8.47 17.592 18.243 17.592h.651c7.167-.326 13.357-4.887 15.963-11.077h5.864c24.759 0 48.214 7.167 69.39 21.176 16.288 10.751 28.016 24.76 34.531 41.7 5.538 13.683 5.212 27.04-.652 38.443-9.121 17.266-24.432 26.714-44.63 26.714-13.031 0-25.41-3.91-31.926-6.842-3.583 3.258-10.099 8.47-14.66 11.729 14.009 6.515 28.343 10.099 42.025 10.099 31.274 0 54.404-17.267 63.2-34.533 9.447-18.896 8.795-51.474-15.637-79.165zM69.225 175.27c.326 9.774 8.47 17.592 18.243 17.592h.652c10.099-.325 17.917-8.796 17.591-18.895-.325-9.774-8.47-17.592-18.243-17.592h-.651c-.652 0-1.63 0-2.28.325-13.357-22.153-18.895-46.26-16.94-72.323 1.302-19.547 7.818-36.488 19.22-50.497 9.447-12.054 27.69-17.918 40.07-18.243 34.531-.652 49.19 42.351 50.168 59.618 4.235.977 11.402 3.258 16.289 4.887C189.434 27.366 156.857 0 125.584 0c-29.32 0-56.359 21.176-67.11 52.451-14.985 41.7-5.212 81.771 13.031 113.372-1.628 2.28-2.606 5.864-2.28 9.448z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Redux</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Sosyal Medya</h3>
              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/yasinatesim" target="_blank" className="px-4 py-2 bg-gray-800 text-white rounded-button flex items-center gap-2 hover:bg-gray-900 transition-colors whitespace-nowrap">
                  <i className="ri-github-fill"></i> GitHub
                </a>
                <a href="https://linkedin.com/in/yasinatesim" target="_blank" className="px-4 py-2 bg-blue-700 text-white rounded-button flex items-center gap-2 hover:bg-blue-800 transition-colors whitespace-nowrap">
                  <i className="ri-linkedin-fill"></i> LinkedIn
                </a>
                <a href="https://instagram.com/yasinatesim" target="_blank" className="px-4 py-2 bg-pink-600 text-white rounded-button flex items-center gap-2 hover:bg-pink-700 transition-colors whitespace-nowrap">
                  <i className="ri-instagram-fill"></i> Instagram
                </a>
                <a href="https://twitter.com/yasinatesim" target="_blank" className="px-4 py-2 bg-blue-400 text-white rounded-button flex items-center gap-2 hover:bg-blue-500 transition-colors whitespace-nowrap">
                  <i className="ri-twitter-fill"></i> Twitter
                </a>
                <a href="https://medium.com/@yasinatesim" target="_blank" className="px-4 py-2 bg-gray-700 text-white rounded-button flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap">
                  <i className="ri-medium-fill"></i> Medium
                </a>
                <a href="https://dev.to/yasinatesim" target="_blank" className="px-4 py-2 bg-black text-white rounded-button flex items-center gap-2 hover:bg-gray-900 transition-colors whitespace-nowrap">
                  <i className="ri-code-box-fill"></i> Dev.to
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
	)
}

export default About