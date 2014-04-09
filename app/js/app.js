(function() {
	var folders = {};

	function createFolderNode(id, name) {
		return {
			id: id,
			name: name,
			type: 'folder',
			children: []
		}
	}

	function createFileNode(id, name) {
		return {
			id: id,
			name: name,
			type: 'file'
		}
	}

	var getFullDocumentTree = function getFullDocumentTree(includeFiles, callback) {

        d3.csv('GetFullDocumentTree.csv', function(error, rows) {
            console.log(rows)
            _.forEach(rows, function(row) {
                console.log(row.path)
				if (!folders[row.path]) {

                    var split = row.path.split('/');

					var folder = createFolderNode(row.folder_id, _.last(split));
					folders[row.path] = folder;

					var parent = _.initial(split).join('/');

					if (parent) {
						folders[parent].children.push(folder);
					}
				}

				if (includeFiles) {
					var node = createFileNode(row.document_id, row.document_name);
					folders[row.path].children.push(node);
				}
				
			});

			callback(folders);
		});
	};
	window.getFullDocumentTree = getFullDocumentTree;

}());