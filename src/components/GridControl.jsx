const GridControl = ({ showGrid, setShowGrid }) => {
    return (
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="gridToggle"
          checked={showGrid}
          onChange={() => setShowGrid(!showGrid)}
          className="cursor-pointer w-5 h-5"
        />
        <label htmlFor="gridToggle" className="text-white cursor-pointer">
          Show Grid Helper
        </label>
      </div>
    );
  };
  
  export default GridControl;
  