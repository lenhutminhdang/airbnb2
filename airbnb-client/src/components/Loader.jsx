export default function Loader() {
  return (
    <div className="loader fixed top-0 right-0 bottom-0 left-0">
      <div className="outer absolute top-1/2 left-1/2 border-transparent border-[3px] border-solid border-t-red-500 border-r-red-500 rounded-full w-14 h-14 -ml-7 -mt-7 animate-[spin_2s_linear_infinite]"></div>

      <div className="middle absolute top-1/2 left-1/2 border-transparent border-[3px] border-solid border-t-red-500 border-r-red-500 rounded-full w-8 h-8 -ml-4 -mt-4 animate-[spin_1.75s_linear_reverse_infinite]"></div>

      <div className="inner  absolute top-1/2 left-1/2 border-transparent border-[3px] border-solid border-t-red-500 border-r-red-500 rounded-full w-3 h-3 -ml-2 -mt-2 animate-[spin_1.5s_linear_infinite]"></div>
    </div>
  );
}
