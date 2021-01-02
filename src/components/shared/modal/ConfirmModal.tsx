import React, { useEffect, useState } from "react"
import { BehaviorSubject } from "rxjs"

interface ConfirmModalProps {
	open: boolean
	title: string
	content: string
	titleButtonOk: string
	handleOk: () => Promise<void>
	titleButtonNo?: string
	handleCancel?: () => void
}

const confirmModalSubject = new BehaviorSubject<ConfirmModalProps>({
	open: false,
	title: "",
	content: "",
	titleButtonOk: "",
	handleOk: async () => {},
})

export const toggleConfirmModal = (value: ConfirmModalProps) => {
	confirmModalSubject.next(value)
}

export default function ConfirmModal() {
	const [data, setData] = useState<ConfirmModalProps>({
		open: false,
		title: "",
		content: "",
		titleButtonOk: "",
		handleOk: async () => {},
	})

	useEffect(() => {
		const subscribe = confirmModalSubject.subscribe((value) => {
			setData(value)
		})
		return () => {
			subscribe.unsubscribe()
		}
	}, [])

	return (
		<div key={`confirm-modal`} id="confirm-modal">
			{data.open && (
				<>
					<div className="back-drop"></div>
					<div className="confirm-modal">
						<div className="main">
							<div className="hearder-modal">
								{<div className="title">{data.title}</div>}

								<div
									className="close"
									onClick={() => {
										setData({ ...data, open: false })
									}}
								>
									+
								</div>
							</div>
							<div className="content">{data.content}</div>
							<div className="group-action">
								<button
									className="btn-ok"
									type="button"
									onClick={() => {
										data.handleOk()
										setData({ ...data, open: false })
									}}
								>
									{data.titleButtonOk ? data.titleButtonOk : "OK"}
								</button>

								{!data.titleButtonNo ? (
									<></>
								) : (
									<button
										className="btn-cancel"
										type="button"
										onClick={() => {
											data.handleCancel && data.handleCancel()
											setData({ ...data, open: false })
										}}
									>
										Cancel
									</button>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
