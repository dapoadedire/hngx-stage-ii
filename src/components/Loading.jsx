import loading from "../assets/images/loading.gif";

export const Loading = () => {
    return (
        <div className="flex items-center justify-center p-12">
       <div
       className="flex flex-col items-center justify-center gap-4"
       >
       <h2
       className="mb-8 text-center text-2xl font-bold"
       >
                Loading your movies...
         </h2>
         <img src={loading} alt="loading" 
         className="w-full"
         />
       </div>
              </div>
    )
}